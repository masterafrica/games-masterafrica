// ADMIN — one challenge: stats so far, status controls, leaderboard preview, latest entries.
// Route: admin/mag-challenges/:id
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileText,
  Heart,
  Pencil,
  Users,
} from "lucide-react";
import {
  useGetAdminChallenge,
  useGetChallengeSubmissions,
  useGetLeaderboard,
  useSetChallengeFinished,
  type AdminChallengeDetail,
  type GetSocialPost,
  type LeaderboardEntry,
} from "@/lib/graphql";
import {
  Avatar,
  CategoryBadge,
  ChallengeStateBadge,
  Spinner,
  endsLabel,
  errMsg,
  usePaginated,
} from "@/components/dailychalanges/magshared";
import { getreadabledate } from "@/utils";

const StatCard = ({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent: string;
}) => (
  <div className="relative rounded-2xl border border-gray-100 bg-white shadow-sm p-5 flex flex-col gap-3 overflow-hidden">
    <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 ${accent}`} />
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${accent}`}>{icon}</div>
    <div>
      <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

const AdminChallengeDetailPage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const [getDetail] = useGetAdminChallenge();
  const [getBoard] = useGetLeaderboard();
  const [getEntries] = useGetChallengeSubmissions();
  const { setChallengeFinished, loading: saving } = useSetChallengeFinished();

  const [detail, setDetail] = useState<AdminChallengeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const r = await getDetail({ variables: { input: { challengeId: id } } });
      setDetail(r.data?.GetAdminChallenge ?? null);
    } catch {
      setDetail(null);
    } finally {
      setLoading(false);
    }
  }, [getDetail, id]);

  useEffect(() => {
    setLoading(true);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // first page of the leaderboard only (full one has its own page)
  const board = usePaginated<LeaderboardEntry>(
    async (page) => {
      const r = await getBoard({ variables: { input: { page, challengeId: id } } });
      return r.data?.GetLeaderboard;
    },
    [id],
  );

  const entries = usePaginated<GetSocialPost>(
    async (page) => {
      const r = await getEntries({ variables: { input: { page, challengeId: id } } });
      return r.data?.GetChallengeSubmissions;
    },
    [id],
  );

  const c = detail?.challenge;
  const publicPath = c ? `/mag-challenge/${c.slug}` : "";

  const toggleFinished = async () => {
    if (!c) return;
    const finishing = c.isOpen;
    if (finishing && !window.confirm("Finish this challenge? Entries and voting will close for everyone.")) return;
    try {
      await setChallengeFinished({ challengeId: c.id, finished: finishing });
      toast.success(finishing ? "Challenge finished" : "Challenge re-opened");
      load();
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  const copyLink = () =>
    navigator.clipboard
      .writeText(`${window.location.origin}${publicPath}`)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Couldn't copy"));

  if (loading) return <Spinner />;
  if (!detail || !c) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">We couldn&apos;t find this challenge.</p>
        <Link to="/admin/mag-challenges" className="text-[#9747FF] font-semibold">
          Back to challenges
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <Link to="/admin/mag-challenges" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
        <ArrowLeft size={16} /> All challenges
      </Link>

      {/* header */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col md:flex-row gap-5">
        {c.image ? (
          <img alt="" src={c.image} className="w-full md:w-40 h-40 rounded-xl object-cover shrink-0" />
        ) : null}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{c.title}</h1>
            <ChallengeStateBadge open={c.isOpen} />
          </div>
          <p className="text-sm text-gray-500">
            {endsLabel(c.endsAt, c.isOpen)}
            {c.prize ? ` · ${c.prize}` : ""}
            {` · created ${getreadabledate(c.createdAt)}`}
          </p>
          <p className="text-xs text-gray-400 break-all">
            {window.location.origin}
            {publicPath}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Copy size={13} /> Copy link
            </button>
            <a
              href={publicPath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <ExternalLink size={13} /> View page
            </a>
            <button
              onClick={() => navigate(`/admin/mag-challenges/${c.id}/edit`)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Pencil size={13} /> Edit
            </button>
            <button
              disabled={saving}
              onClick={toggleFinished}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold disabled:opacity-50 ${
                c.isOpen ? "bg-rose-500 text-white hover:opacity-90" : "bg-emerald-500 text-white hover:opacity-90"
              }`}
            >
              {c.isOpen ? "Finish challenge" : "Re-open challenge"}
            </button>
          </div>
        </div>
      </div>

      {/* stats so far */}
      <div className={`grid grid-cols-2 ${detail.qualificationEnabled ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-4`}>
        <StatCard icon={<FileText size={18} />} label="Entries" value={detail.entriesCount} accent="bg-[#9747FF]" />
        <StatCard icon={<Users size={18} />} label="Players" value={detail.participantsCount} accent="bg-amber-500" />
        <StatCard icon={<Heart size={18} />} label="Votes" value={detail.votesCount} accent="bg-rose-500" />
        {detail.qualificationEnabled && (
          <StatCard icon={<CheckCircle2 size={18} />} label="Qualified" value={detail.qualifiedCount} accent="bg-emerald-500" />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* leaderboard */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Leaderboard</h2>
            <Link
              to={`/admin/mag-challenges/${c.id}/leaderboard`}
              className="text-xs font-semibold text-[#9747FF] hover:underline"
            >
              Full leaderboard &amp; voters →
            </Link>
          </div>
          {board.loading && board.items.length === 0 && <Spinner />}
          {!board.loading && board.items.length === 0 && <p className="text-sm text-gray-400 py-4">No entries yet.</p>}
          <ul>
            {board.items.slice(0, 10).map((e) => {
              const name = `${e.user.firstName} ${e.user.lastName}`;
              return (
                <li key={e.user.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="w-5 text-sm font-bold text-gray-400">{e.rank}</span>
                  <Avatar name={name} size={30} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{e.user.email}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900">
                    <Heart size={13} className="text-rose-500" fill="currentColor" />
                    {e.voteCount}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* latest entries (paginated) */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
          <h2 className="font-semibold text-gray-800">Entries</h2>
          {entries.loading && entries.items.length === 0 && <Spinner />}
          {!entries.loading && entries.items.length === 0 && <p className="text-sm text-gray-400 py-4">No entries yet.</p>}
          <ul>
            {entries.items.map((s) => (
              <li key={s.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{s.title}</p>
                  <button
                    className="text-[11px] text-gray-400 truncate hover:text-[#9747FF] text-left"
                    onClick={() => navigate(`/admin/mag-challenge/submissions/${s.user.id}`)}
                  >
                    {s.user.firstName} {s.user.lastName} · {getreadabledate(s.createdAt)}
                  </button>
                </div>
                <CategoryBadge category={s.category} />
                {s.url && (
                  <a href={s.url} target="_blank" rel="noreferrer" className="text-[#9747FF]" aria-label="Open entry">
                    <ExternalLink size={14} />
                  </a>
                )}
              </li>
            ))}
          </ul>
          {entries.hasMore && !entries.loading && entries.items.length > 0 && (
            <button onClick={entries.loadMore} className="w-full text-xs font-semibold text-[#9747FF] py-2 hover:underline">
              Load more
            </button>
          )}
          {entries.loading && entries.items.length > 0 && <Spinner />}
        </section>
      </div>
    </div>
  );
};

export default AdminChallengeDetailPage;