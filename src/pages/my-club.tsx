// CLUB — my club.  Route: /my-club   (inside ProtectedRoute / MainLayout)
// Owner  → dashboard: members, challenges joined, entries, total earnings, challenge list, member list, share link.
// Member → club details + instructions.   No club → short explanation.
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Copy, Search, Share2, Trophy, Users, Wallet, FileText, X } from "lucide-react";
import {
  useGetMyClub,
  useGetMyClubChallenges,
  useGetMyClubMembers,
  useGetMyClubStats,
  type ClubChallengeRow,
  type ClubMemberEntry,
  type ClubStats,
  type MyClub,
} from "@/lib/graphql";
import {
  Avatar,
  ChallengeStateBadge,
  Spinner,
  naira,
  useDebounced,
  usePaginated,
} from "@/components/dailychalanges/magshared";
import ShareModal, { getClubUrl } from "@/components/dailychalanges/sharemodal";
import { getreadabledate } from "@/utils";

const Stat = ({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
}) => (
  <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white mb-3 ${accent}`}>{icon}</div>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
    {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
  </div>
);

const SearchBox = ({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) => (
  <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-1.5">
    <Search size={14} className="text-gray-400" />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="text-sm outline-none bg-transparent w-44"
    />
    {value && (
      <button onClick={() => onChange("")} className="text-gray-400">
        <X size={14} />
      </button>
    )}
  </div>
);

const LoadMore = ({ show, onClick }: { show: boolean; onClick: () => void }) =>
  show ? (
    <div className="text-center pt-3">
      <Button size="sm" variant="flat" radius="full" onPress={onClick}>
        Load more
      </Button>
    </div>
  ) : null;

const MyClubPage = () => {
  const navigate = useNavigate();
  const [getMyClub] = useGetMyClub();
  const [getStats] = useGetMyClubStats();
  const [getChallenges] = useGetMyClubChallenges();
  const [getMembers] = useGetMyClubMembers();

  const [mine, setMine] = useState<MyClub | null>(null);
  const [stats, setStats] = useState<ClubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [cQuery, setCQuery] = useState("");
  const [mQuery, setMQuery] = useState("");
  const cDebounced = useDebounced(cQuery);
  const mDebounced = useDebounced(mQuery);

  useEffect(() => {
    (async () => {
      try {
        const r = await getMyClub();
        const m = r.data?.GetMyClub ?? null;
        setMine(m);
        if (m?.role === "owner") {
          const s = await getStats();
          setStats(s.data?.GetMyClubStats ?? null);
        }
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isOwner = mine?.role === "owner";

  const challenges = usePaginated<ClubChallengeRow>(
    async (page) => {
      if (!isOwner) return null;
      const r = await getChallenges({ variables: { input: { page, query: cDebounced || undefined } } });
      return r.data?.GetMyClubChallenges;
    },
    [isOwner, cDebounced],
  );

  const members = usePaginated<ClubMemberEntry>(
    async (page) => {
      if (!isOwner) return null;
      const r = await getMembers({ variables: { input: { page, query: mDebounced || undefined } } });
      return r.data?.GetMyClubMembers;
    },
    [isOwner, mDebounced],
  );

  if (loading) return <Spinner />;

  if (!mine) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <Users className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You&apos;re not in a club yet</h1>
        <p className="text-sm text-gray-500 mb-6">
          Ask a club owner for their club link, open it and press Join. You can only be in one club.
        </p>
        <Button color="primary" radius="full" onPress={() => navigate("/mag-challenge")}>
          Browse challenges
        </Button>
      </div>
    );
  }

  const club = mine.club;
  const link = getClubUrl(club.slug);
  const copy = () =>
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Couldn't copy"));

  const ownerName = `${club.owner.firstName ?? ""} ${club.owner.lastName ?? ""}`.trim() || club.owner.username || "Owner";

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      {/* header */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-violet-600 text-white p-6">
        <p className="text-xs uppercase tracking-wide opacity-80">{isOwner ? "Your club" : "Club you're in"}</p>
        <h1 className="text-3xl font-bold mt-1">{club.name}</h1>
        {club.description && <p className="text-sm opacity-90 mt-2 whitespace-pre-line">{club.description}</p>}
        {!club.isActive && (
          <p className="mt-3 inline-block rounded-full bg-white/20 text-xs px-3 py-1">Closed to new members</p>
        )}
      </div>

      {/* owner: headline numbers */}
      {isOwner ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat icon={<Users size={18} />} label="Members" value={stats?.totalMembers ?? club.memberCount} accent="bg-[#9747FF]" />
          <Stat icon={<Trophy size={18} />} label="Challenges joined" value={stats?.totalChallenges ?? 0} sub="by your members" accent="bg-amber-500" />
          <Stat icon={<FileText size={18} />} label="Entries" value={stats?.totalEntries ?? 0} sub="by your members" accent="bg-sky-500" />
          <Stat
            icon={<Wallet size={18} />}
            label="Total earnings"
            value={naira(stats?.totalEarnings)}
            sub={stats ? `${naira(stats.earningPerEntry)} per entry` : undefined}
            accent="bg-emerald-500"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Stat icon={<Users size={18} />} label="Members" value={club.memberCount} accent="bg-[#9747FF]" />
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <p className="text-xs text-gray-400 mb-1">Club owner</p>
            <div className="flex items-center gap-3">
              <Avatar name={ownerName} size={40} src={club.owner.avatar} userId={club.owner.id} />
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{ownerName}</p>
            </div>
          </div>
        </div>
      )}

      {/* share */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
        <p className="font-semibold text-gray-900 dark:text-white">Club link</p>
        <p className="text-xs text-gray-500">Share it. People who open it can see the club and join.</p>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2">
          <input readOnly value={link} className="flex-1 min-w-0 bg-transparent text-sm outline-none" onFocus={(e) => e.currentTarget.select()} />
          <button onClick={copy} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Copy size={14} /> Copy
          </button>
        </div>
        <Button color="primary" radius="full" startContent={<Share2 className="w-4 h-4" />} onPress={() => setShareOpen(true)}>
          Share
        </Button>
      </div>

      {/* instructions */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Instructions</p>
        {club.instructions ? (
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{club.instructions}</p>
        ) : (
          <p className="text-sm text-gray-400">No instructions have been added yet.</p>
        )}
      </div>

      {/* owner: challenges my members joined */}
      {isOwner && (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold text-gray-900 dark:text-white">Challenges your members joined</p>
            <SearchBox value={cQuery} onChange={setCQuery} placeholder="Search challenges…" />
          </div>

          {challenges.loading && challenges.items.length === 0 && <Spinner />}
          {!challenges.loading && challenges.items.length === 0 && (
            <p className="text-sm text-gray-400 py-4 text-center">
              {cQuery ? "No challenges match your search." : "Your members haven't joined a challenge yet."}
            </p>
          )}

          <div className="space-y-2">
            {challenges.items.map((r) => (
              <button
                key={r.challenge.id}
                onClick={() => navigate(`/my-club/challenges/${r.challenge.id}`)}
                className="w-full text-left flex items-center gap-3 rounded-xl border border-gray-100 dark:border-gray-800 p-3 hover:border-primary/40 hover:shadow-sm transition-all"
              >
                {r.challenge.image ? (
                  <img alt="" src={r.challenge.image} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-amber-300" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{r.challenge.title}</p>
                    <ChallengeStateBadge open={r.challenge.isOpen} />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {r.players} player{r.players !== 1 && "s"} · {r.entries} entr{r.entries === 1 ? "y" : "ies"} · {r.votes} vote
                    {r.votes !== 1 && "s"}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-emerald-600">{naira(r.earnings)}</p>
                  <p className="text-[11px] text-gray-400">earned</p>
                </div>
              </button>
            ))}
          </div>
          <LoadMore show={challenges.hasMore && !challenges.loading && challenges.items.length > 0} onClick={challenges.loadMore} />
        </div>
      )}

      {/* owner: members */}
      {isOwner && (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold text-gray-900 dark:text-white">Members</p>
            <SearchBox value={mQuery} onChange={setMQuery} placeholder="Search members…" />
          </div>

          {members.loading && members.items.length === 0 && <Spinner />}
          {!members.loading && members.items.length === 0 && (
            <p className="text-sm text-gray-400 py-4 text-center">
              {mQuery ? "No members match your search." : "No one has joined yet. Share your link!"}
            </p>
          )}

          <div>
            {members.items.map((m) => {
              const name = `${m.user.firstName ?? ""} ${m.user.lastName ?? ""}`.trim() || m.user.username || "Member";
              return (
                <div
                  key={m.user.id}
                  onClick={() => navigate(`/my-club/members/${m.user.id}`)}
                  className="cursor-pointer flex items-center gap-3 py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-primary/5 rounded-lg px-1"
                >
                  <Avatar name={name} size={38} src={m.user.avatar} userId={m.user.id} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{name}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {m.challengesCount} challenge{m.challengesCount !== 1 && "s"} · {m.entriesCount} entr
                      {m.entriesCount === 1 ? "y" : "ies"} · joined {getreadabledate(m.joinedAt)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 shrink-0">{naira(m.earnings)}</span>
                </div>
              );
            })}
          </div>
          <LoadMore show={members.hasMore && !members.loading && members.items.length > 0} onClick={members.loadMore} />
        </div>
      )}

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={link}
        heading="Share your club"
        subtitle="Anyone with this link can see the club and join it."
        message={`Join "${club.name}" on MAG!`}
      />
    </div>
  );
};

export default MyClubPage;