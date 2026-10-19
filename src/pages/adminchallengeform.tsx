// ADMIN — create / edit a challenge.
// Routes: admin/mag-challenges/new   and   admin/mag-challenges/:id/edit
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, ImagePlus } from "lucide-react";
import {
  useCreateChallenge,
  useGetAdminChallenge,
  useUpdateChallenge,
  type CreateChallengeInput,
  type FileInput,
} from "@/lib/graphql";
import { Spinner, errMsg } from "@/components/dailychalanges/magshared";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

/** local datetime-local value <-> ISO */
const toLocalInput = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
};

type Picked = { preview: string; file: FileInput };

/** shrink to max 1600px JPEG so the base64 upload stays small */
const processImage = (file: File): Promise<Picked> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        const dataUrl = c.toDataURL("image/jpeg", 0.85);
        resolve({
          preview: dataUrl,
          file: {
            uri: dataUrl.split(",")[1],
            fileName: file.name.replace(/\.\w+$/, "") + ".jpg",
            type: "image/jpeg",
            fileSize: Math.round(dataUrl.length * 0.75),
          },
        });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

const field = "w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9747FF]";
const label = "block text-xs font-semibold text-gray-600 mb-1";

const AdminChallengeFormPage = () => {
  const { id } = useParams();
  const editing = !!id;
  const navigate = useNavigate();

  const [getChallenge] = useGetAdminChallenge();
  const { createChallenge, loading: creating } = useCreateChallenge();
  const { updateChallenge, loading: updating } = useUpdateChallenge();

  const [loading, setLoading] = useState(editing);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [prize, setPrize] = useState("");
  const [stepsText, setStepsText] = useState("");
  const [showBank, setShowBank] = useState(false);
  const [entryFeeNote, setEntryFeeNote] = useState("");
  const [titleLabel, setTitleLabel] = useState("Title");
  const [linkLabel, setLinkLabel] = useState("Entry Link");
  const [descLabel, setDescLabel] = useState("Description (Optional)");
  const [descRequired, setDescRequired] = useState(false);
  const [maxWords, setMaxWords] = useState("");
  const [category, setCategory] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [hadEnd, setHadEnd] = useState(false);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [picked, setPicked] = useState<Picked | null>(null);

  // edit: load current values
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const r = await getChallenge({ variables: { input: { challengeId: id } } });
        const c = r.data?.GetAdminChallenge.challenge;
        if (!c) return;
        setTitle(c.title);
        setSlug(c.slug);
        setTagline(c.tagline ?? "");
        setDescription(c.description ?? "");
        setPrize(c.prize ?? "");
        setStepsText(c.steps.join("\n"));
        setShowBank(c.showBankDetails);
        setEntryFeeNote(c.entryFeeNote ?? "");
        setTitleLabel(c.titleLabel);
        setLinkLabel(c.linkLabel);
        setDescLabel(c.descriptionLabel);
        setDescRequired(c.descriptionRequired);
        setMaxWords(c.maxDescriptionWords ? String(c.maxDescriptionWords) : "");
        setCategory(c.category ?? "");
        setEndsAt(toLocalInput(c.endsAt));
        setHadEnd(!!c.endsAt);
        setExistingImage(c.image ?? null);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onTitle = (v: string) => {
    setTitle(v);
    if (!editing && !slugTouched) setSlug(slugify(v));
  };

  const onPickImage = async (f?: File) => {
    if (!f) return;
    if (!/^image\//.test(f.type)) return toast.error("Please choose an image file");
    try {
      setPicked(await processImage(f));
    } catch {
      toast.error("Couldn't read that image");
    }
  };

  const handleSave = async () => {
    if (!title.trim()) return toast.error("Give the challenge a title");
    if (!editing && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      return toast.error("Link name: lowercase letters, numbers and dashes only, no spaces");
    }
    if (endsAt && new Date(endsAt).getTime() <= Date.now()) return toast.error("End time must be in the future");

    const common = {
      tagline: tagline.trim(),
      description: description.trim(),
      prize: prize.trim(),
      steps: stepsText.split("\n").map((s) => s.trim()).filter(Boolean),
      entryFeeNote: entryFeeNote.trim(),
      showBankDetails: showBank,
      titleLabel: titleLabel.trim() || "Title",
      linkLabel: linkLabel.trim() || "Entry Link",
      descriptionLabel: descLabel.trim() || "Description (Optional)",
      descriptionRequired: descRequired,
      maxDescriptionWords: maxWords ? Number(maxWords) : undefined,
      category: category.trim() || undefined,
      ...(picked ? { image: picked.file } : {}),
    };

    try {
      if (editing) {
        await updateChallenge({
          challengeId: id!,
          title: title.trim(),
          ...common,
          // 0 clears the limit
          maxDescriptionWords: maxWords ? Number(maxWords) : 0,
          ...(endsAt ? { endsAt: new Date(endsAt).toISOString() } : {}),
          clearEndsAt: !endsAt && hadEnd,
        });
        toast.success("Challenge updated");
        navigate(`/admin/mag-challenges/${id}`);
      } else {
        const input: CreateChallengeInput = {
          slug,
          title: title.trim(),
          ...common,
          ...(endsAt ? { endsAt: new Date(endsAt).toISOString() } : {}),
        };
        const res = await createChallenge(input);
        toast.success("Challenge created");
        navigate(`/admin/mag-challenges/${res.data?.CreateChallenge.id ?? ""}`);
      }
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  if (loading) return <Spinner />;

  const saving = creating || updating;
  const preview = picked?.preview ?? existingImage;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        to={editing ? `/admin/mag-challenges/${id}` : "/admin/mag-challenges"}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={16} /> Back
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{editing ? "Edit challenge" : "New challenge"}</h1>

      <div className="space-y-6">
        {/* poster */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <p className={label}>Poster image</p>
          <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#9747FF] cursor-pointer p-4 text-center">
            {preview ? (
              <img alt="Poster preview" src={preview} className="max-h-64 rounded-lg" />
            ) : (
              <>
                <ImagePlus className="text-gray-400" />
                <span className="text-sm text-gray-500">Click to choose a poster (JPG / PNG / WEBP)</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onPickImage(e.target.files?.[0])} />
          </label>
          {preview && <p className="text-xs text-gray-400 mt-2">Click the image to replace it.</p>}
        </section>

        {/* basics */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-4">
          <div>
            <label className={label}>Title *</label>
            <input className={field} value={title} onChange={(e) => onTitle(e.target.value)} placeholder="MAG African Story Photography Challenge" />
          </div>

          <div>
            <label className={label}>Link name * {editing && <span className="text-gray-400">(can&apos;t be changed)</span>}</label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white overflow-hidden">
              <span className="px-3 text-sm text-gray-400 bg-gray-50 border-r border-gray-200 py-2.5 whitespace-nowrap">
                /mag-challenge/
              </span>
              <input
                className="flex-1 px-3 py-2.5 text-sm outline-none disabled:bg-gray-50"
                disabled={editing}
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                }}
                placeholder="photo-challenge"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Lowercase, no spaces. This is the link you share.</p>
          </div>

          <div>
            <label className={label}>Tagline</label>
            <input className={field} value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Most inspiring picture wins ₦10,000 + a Power Bank" />
          </div>

          <div>
            <label className={label}>Prize (shown as a badge)</label>
            <input className={field} value={prize} onChange={(e) => setPrize(e.target.value)} placeholder="₦10,000 + Bluetooth speakers" />
          </div>

          <div>
            <label className={label}>Intro text (optional)</label>
            <textarea className={field} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </section>

        {/* how to participate */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-4">
          <div>
            <label className={label}>How to participate (one step per line)</label>
            <textarea
              className={field}
              rows={7}
              value={stepsText}
              onChange={(e) => setStepsText(e.target.value)}
              placeholder={"Record your 30 - 60 sec dance video with any song of your choice\nPost it on your socials\nSubmit the link on your mag account\nTop 3 Voted will be Judged"}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={showBank} onChange={(e) => setShowBank(e.target.checked)} />
            Show the entry-fee bank details on the page
          </label>
          {showBank && (
            <div>
              <label className={label}>Entry fee note (shown above the bank details)</label>
              <textarea
                className={field}
                rows={3}
                value={entryFeeNote}
                onChange={(e) => setEntryFeeNote(e.target.value)}
                placeholder="Submission is free, but players must pay ₦500 or invite a friend to qualify for voting/judging."
              />
            </div>
          )}
        </section>

        {/* form labels */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-sm font-semibold text-gray-800">Entry form</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={label}>Title field label</label>
              <input className={field} value={titleLabel} onChange={(e) => setTitleLabel(e.target.value)} placeholder="Dance Title" />
            </div>
            <div>
              <label className={label}>Link field label</label>
              <input className={field} value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} placeholder="Entry Link" />
            </div>
            <div>
              <label className={label}>Description field label</label>
              <input className={field} value={descLabel} onChange={(e) => setDescLabel(e.target.value)} placeholder="Description (Optional)" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={descRequired} onChange={(e) => setDescRequired(e.target.checked)} />
              Description is required
            </label>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              Max words
              <input
                className="w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-sm"
                inputMode="numeric"
                value={maxWords}
                onChange={(e) => setMaxWords(e.target.value.replace(/\D/g, ""))}
                placeholder="none"
              />
            </div>
          </div>
          <div>
            <label className={label}>Category (saved on each entry; defaults to the title)</label>
            <input className={field} value={category} onChange={(e) => setCategory(e.target.value)} placeholder="African Story Photography" />
          </div>
        </section>

        {/* duration */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-2">
          <label className={label}>Ends at (optional)</label>
          <div className="flex flex-wrap items-center gap-3">
            <input type="datetime-local" className={`${field} max-w-xs`} value={endsAt} onChange={(e) => setEndsAt(e.target.value)} />
            {endsAt && (
              <button className="text-xs text-gray-500 underline" onClick={() => setEndsAt("")}>
                Clear
              </button>
            )}
          </div>
          <p className="text-[11px] text-gray-400">
            Leave empty to keep it running until you finish it yourself. When it ends (or you finish it), entries and
            voting close.
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
            {saving ? "Saving…" : editing ? "Save changes" : "Create challenge"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminChallengeFormPage;