// ADMIN — one club: details, owner, members (search + pages), remove member, delete club.
// Route: admin/clubs/:id
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import toast from "react-hot-toast";
import { ArrowLeft, Copy, ExternalLink, Pencil, Search, Trash2, Users, X } from "lucide-react";
import {
  useDeleteClub,
  useGetAdminClub,
  useGetAdminClubMembers,
  useRemoveClubMember,
  type ClubInfo,
  type ClubMemberEntry,
} from "@/lib/graphql";
import { Avatar, Spinner, errMsg, useDebounced, usePaginated } from "@/components/dailychalanges/magshared";
import { getreadabledate } from "@/utils";

const nm = (u: { firstName?: string | null; lastName?: string | null; username?: string | null }) =>
  `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.username || "User";

const AdminClubDetailPage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const [getClub] = useGetAdminClub();
  const [getMembers] = useGetAdminClubMembers();
  const { removeClubMember, loading: removing } = useRemoveClubMember();
  const { deleteClub, loading: deleting } = useDeleteClub();

  const [club, setClub] = useState<ClubInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query);

  const load = useCallback(async () => {
    try {
      const r = await getClub({ variables: { input: { clubId: id } } });
      setClub(r.data?.GetAdminClub ?? null);
    } catch {
      setClub(null);
    } finally {
      setLoading(false);
    }
  }, [getClub, id]);

  useEffect(() => {
    setLoading(true);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const members = usePaginated<ClubMemberEntry>(
    async (page) => {
      const r = await getMembers({ variables: { input: { clubId: id, page, query: debounced || undefined } } });
      return r.data?.GetAdminClubMembers;
    },
    [id, debounced],
  );

  const link = club ? `${window.location.origin}/club/${club.slug}` : "";

  const copyLink = () =>
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Couldn't copy"));

  const handleRemove = async (m: ClubMemberEntry) => {
    if (!window.confirm(`Remove ${nm(m.user)} from this club? They will be able to join a club again.`)) return;
    try {
      await removeClubMember({ clubId: id, userId: m.user.id });
      toast.success("Member removed");
      members.reload();
      load();
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  const handleDelete = async () => {
    if (!club) return;
    if (!window.confirm(`Delete "${club.name}"?\n\nAll ${club.memberCount} members will be released (they can join another club). This can't be undone.`)) return;
    try {
      await deleteClub(club.id);
      toast.success("Club deleted");
      navigate("/admin/clubs");
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  if (loading) return <Spinner />;
  if (!club) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">We couldn&apos;t find this club.</p>
        <Link to="/admin/clubs" className="text-[#9747FF] font-semibold">
          Back to clubs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      <Link to="/admin/clubs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
        <ArrowLeft size={16} /> All clubs
      </Link>

      {/* header */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{club.name}</h1>
          <span
            className={`rounded-full text-[11px] font-semibold px-2.5 py-0.5 ${
              club.isActive ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
            }`}
          >
            {club.isActive ? "Open" : "Closed to new members"}
          </span>
        </div>
        {club.description && <p className="text-sm text-gray-600 whitespace-pre-line">{club.description}</p>}
        <p className="text-xs text-gray-400 break-all">{link}</p>
        <p className="text-xs text-gray-400">Created {getreadabledate(club.createdAt)}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Copy size={13} /> Copy link
          </button>
          <a
            href={`/club/${club.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            <ExternalLink size={13} /> View page
          </a>
          <button
            onClick={() => navigate(`/admin/clubs/${club.id}/edit`)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Pencil size={13} /> Edit
          </button>
          <button
            disabled={deleting}
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-40"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>

      {/* owner + count + instructions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <p className="text-xs text-gray-400 mb-2">Owner</p>
          <div className="flex items-center gap-3">
            <Avatar name={nm(club.owner)} size={44} src={club.owner.avatar} userId={club.owner.id} />
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">{nm(club.owner)}</p>
              <p className="text-xs text-gray-400 truncate">{club.owner.email}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <Users size={18} className="text-[#9747FF] mb-2" />
          <p className="text-3xl font-bold text-gray-900">{club.memberCount}</p>
          <p className="text-sm text-gray-500">Member{club.memberCount !== 1 && "s"}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        <p className="font-semibold text-gray-800 mb-2">Instructions</p>
        {club.instructions ? (
          <p className="text-sm text-gray-600 whitespace-pre-line">{club.instructions}</p>
        ) : (
          <p className="text-sm text-gray-400">None added yet.</p>
        )}
      </div>

      {/* members */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold text-gray-800">Members</p>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5">
            <Search size={14} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search members…"
              className="text-sm outline-none bg-transparent w-48"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-gray-400">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <InfiniteScroll
          dataLength={members.items.length}
          next={members.loadMore}
          hasMore={members.hasMore}
          loader={<Spinner />}
          endMessage={
            !members.loading && (
              <p className="text-center text-sm text-gray-400 py-4">
                {members.items.length === 0 ? (query ? "No members match your search." : "No members yet.") : "All members loaded."}
              </p>
            )
          }
        >
          {members.items.map((m) => (
            <div key={m.user.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <Avatar name={nm(m.user)} size={38} src={m.user.avatar} userId={m.user.id} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{nm(m.user)}</p>
                <p className="text-[11px] text-gray-400 truncate">{m.user.email}</p>
              </div>
              <span className="text-[11px] text-gray-400 whitespace-nowrap hidden sm:block">Joined {getreadabledate(m.joinedAt)}</span>
              <button
                disabled={removing}
                onClick={() => handleRemove(m)}
                className="text-xs font-semibold text-rose-600 hover:underline disabled:opacity-40"
              >
                Remove
              </button>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AdminClubDetailPage;