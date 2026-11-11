// ADMIN — create / edit a club (pick the owner by searching users).
// Routes: admin/clubs/new   and   admin/clubs/:id/edit
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, Search, X } from "lucide-react";
import {
  useCreateClub,
  useGetAdminClub,
  useSearchUsers,
  useUpdateClub,
  type ClubUser,
} from "@/lib/graphql";
import { Avatar, Spinner, errMsg, useDebounced } from "@/components/dailychalanges/magshared";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

const field = "w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9747FF]";
const label = "block text-xs font-semibold text-gray-600 mb-1";

const nameOf = (u: ClubUser) => `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.username || u.email || "User";

const AdminClubFormPage = () => {
  const { id } = useParams();
  const editing = !!id;
  const navigate = useNavigate();

  const [getClub] = useGetAdminClub();
  const [searchUsers] = useSearchUsers();
  const { createClub, loading: creating } = useCreateClub();
  const { updateClub, loading: updating } = useUpdateClub();

  const [loading, setLoading] = useState(editing);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [origSlug, setOrigSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [owner, setOwner] = useState<ClubUser | null>(null);
  const [origOwnerId, setOrigOwnerId] = useState("");

  // owner picker
  const [ownerQuery, setOwnerQuery] = useState("");
  const debouncedOwner = useDebounced(ownerQuery);
  const [results, setResults] = useState<ClubUser[]>([]);
  const [searching, setSearching] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const r = await getClub({ variables: { input: { clubId: id } } });
        const c = r.data?.GetAdminClub;
        if (!c) return;
        setName(c.name);
        setSlug(c.slug);
        setOrigSlug(c.slug);
        setDescription(c.description ?? "");
        setInstructions(c.instructions ?? "");
        setIsActive(c.isActive);
        setOwner(c.owner);
        setOrigOwnerId(c.owner.id);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // search users while typing in the owner box
  useEffect(() => {
    if (!pickerOpen) return;
    (async () => {
      setSearching(true);
      try {
        const r = await searchUsers({ variables: { input: { page: 1, query: debouncedOwner || undefined } } });
        setResults(r.data?.SearchUsers.data ?? []);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedOwner, pickerOpen]);

  const onName = (v: string) => {
    setName(v);
    if (!editing && !slugTouched) setSlug(slugify(v));
  };

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Give the club a name");
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return toast.error("Link name: lowercase letters, numbers and dashes only");
    if (!owner) return toast.error("Pick the club owner");

    try {
      if (editing) {
        await updateClub({
          clubId: id!,
          name: name.trim(),
          ...(slug !== origSlug ? { slug } : {}),
          description: description.trim(),
          instructions: instructions.trim(),
          isActive,
          ...(owner.id !== origOwnerId ? { ownerId: owner.id } : {}),
        });
        toast.success("Club updated");
        navigate(`/admin/clubs/${id}`);
      } else {
        const res = await createClub({
          name: name.trim(),
          slug,
          description: description.trim() || undefined,
          instructions: instructions.trim() || undefined,
          ownerId: owner.id,
        });
        toast.success("Club created");
        navigate(`/admin/clubs/${res.data?.CreateClub.id ?? ""}`);
      }
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  if (loading) return <Spinner />;
  const saving = creating || updating;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        to={editing ? `/admin/clubs/${id}` : "/admin/clubs"}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={16} /> Back
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{editing ? "Edit club" : "New club"}</h1>

      <div className="space-y-6">
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-4">
          <div>
            <label className={label}>Club name *</label>
            <input className={field} value={name} onChange={(e) => onName(e.target.value)} placeholder="Lagos Creators Club" />
          </div>

          <div>
            <label className={label}>Link name *</label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white overflow-hidden">
              <span className="px-3 text-sm text-gray-400 bg-gray-50 border-r border-gray-200 py-2.5 whitespace-nowrap">/club/</span>
              <input
                className="flex-1 px-3 py-2.5 text-sm outline-none"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                }}
                placeholder="lagos-creators"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Lowercase, no spaces. This is the link people open to join.</p>
            {editing && slug !== origSlug && (
              <p className="text-[11px] text-amber-700 bg-amber-500/10 rounded-lg px-2 py-1.5 mt-2">
                Heads up: links already shared with the old name (/club/{origSlug}) will stop working.
              </p>
            )}
          </div>

          <div>
            <label className={label}>Description (shown to everyone on the club page)</label>
            <textarea className={field} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div>
            <label className={label}>Instructions (only the owner and members can see these)</label>
            <textarea
              className={field}
              rows={5}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder={"Welcome! Here is what to do:\n1. ...\n2. ..."}
            />
          </div>

          {editing && (
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
              Open to new members
            </label>
          )}
        </section>

        {/* owner */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
          <label className={label}>Club owner *</label>

          {owner ? (
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
              <Avatar name={nameOf(owner)} size={40} src={owner.avatar} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{nameOf(owner)}</p>
                <p className="text-xs text-gray-400 truncate">{owner.email}</p>
              </div>
              <button
                onClick={() => {
                  setOwner(null);
                  setPickerOpen(true);
                }}
                className="text-xs font-semibold text-[#9747FF] hover:underline"
              >
                Change
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-400">Search for the user who will run this club.</p>
          )}

          {(pickerOpen || !owner) && (
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
                <Search size={15} className="text-gray-400" />
                <input
                  autoFocus={pickerOpen}
                  className="flex-1 text-sm outline-none"
                  value={ownerQuery}
                  onFocus={() => setPickerOpen(true)}
                  onChange={(e) => setOwnerQuery(e.target.value)}
                  placeholder="Search by name, username or email…"
                />
                {ownerQuery && (
                  <button onClick={() => setOwnerQuery("")} className="text-gray-400">
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {searching && <Spinner />}
                {!searching && results.length === 0 && <p className="text-sm text-gray-400 p-4">No users found.</p>}
                {results.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setOwner(u);
                      setPickerOpen(false);
                      setOwnerQuery("");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#9747FF]/5 text-left"
                  >
                    <Avatar name={nameOf(u)} size={32} src={u.avatar} />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-gray-800 truncate">{nameOf(u)}</span>
                      <span className="block text-[11px] text-gray-400 truncate">
                        {u.username ? `@${u.username} · ` : ""}
                        {u.email}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <p className="text-[11px] text-gray-400">
            The owner must not be in another club. If you change the owner, the old owner stays in the club as a normal
            member.
          </p>
        </section>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={saving}
            onClick={handleSave}
            className="rounded-xl bg-[#9747FF] text-white px-6 py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving…" : editing ? "Save changes" : "Create club"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminClubFormPage;