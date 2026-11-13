// CLUB OWNER — dashboard of ONE challenge for my club.  Route: /my-club/challenges/:challengeId
// players who joined, total votes, earnings, share the vote link, share the club leaderboard.
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft, ExternalLink, Heart, Search, Share2, Trophy, Users, Wallet, FileText, X } from "lucide-react";
import {
  useGetMyClubChallenge,
  useGetMyClubChallengePlayers,
  type ClubChallengeStats,
  type ClubPlayer,
} from "@/lib/graphql";
import {
  Avatar,
  ChallengeStateBadge,
  Spinner,
  naira,
  useDebounced,
  usePaginated,
  votingText,
} from "@/components/dailychalanges/magshared";
import ShareModal from "@/components/dailychalanges/sharemodal";

const Stat = ({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string | number; accent: string }) => (
  <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white mb-3 ${accent}`}>{icon}</div>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

const ClubChallengeDashboardPage = () => {
  const { challengeId = "" } = useParams();
  const navigate = useNavigate();
  const [getStats] = useGetMyClubChallenge();
  const [getPlayers] = useGetMyClubChallengePlayers();

  const [stats, setStats] = useState<ClubChallengeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query);
  const [share, setShare] = useState<{ url: string; heading: string; subtitle: string; message: string } | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await getStats({ variables: { input: { challengeId } } });
        setStats(r.data?.GetMyClubChallenge ?? null);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId]);

  const players = usePaginated<ClubPlayer>(
    async (page) => {
      const r = await getPlayers({ variables: { input: { challengeId, page, query: debounced || undefined } } });
      return r.data?.GetMyClubChallengePlayers;
    },
    [challengeId, debounced],
  );

  if (loading) return <Spinner />;
  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">We couldn&apos;t open this challenge.</p>
        <Button color="primary" radius="full" onPress={() => navigate("/my-club")}>
          Back to my club
        </Button>
      </div>
    );
  }

  const c = stats.challenge;
  const origin = window.location.origin;
  const voteUrl = `${origin}/mag-challenge/${c.slug}/vote`;
  const boardPath = `/club/${stats.clubSlug}/${c.slug}/leaderboard`;
  const boardUrl = `${origin}${boardPath}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      <Link to="/my-club" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
        <ArrowLeft size={16} /> My club
      </Link>

      {/* header */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 flex gap-4">
        {c.image && <img alt="" src={c.image} className="w-24 h-24 rounded-xl object-cover shrink-0 hidden sm:block" />}
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{c.title}</h1>
            <ChallengeStateBadge open={c.isOpen} />
          </div>
          <p className="text-xs text-gray-500">{votingText(c)}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              size="sm"
              color="primary"
              radius="full"
              startContent={<Share2 className="w-4 h-4" />}
              onPress={() =>
                setShare({
                  url: voteUrl,
                  heading: "Share the voting link",
                  subtitle: "People who open it can vote for the entries.",
                  message: `Vote in the "${c.title}" challenge on MAG!`,
                })
              }
            >
              Share voting link
            </Button>
            <Button
              size="sm"
              variant="flat"
              color="primary"
              radius="full"
              startContent={<Trophy className="w-4 h-4" />}
              onPress={() =>
                setShare({
                  url: boardUrl,
                  heading: "Share the club leaderboard",
                  subtitle: "Shows how your club's members rank in this challenge. Anyone can open it.",
                  message: `See how our club is doing in "${c.title}" on MAG!`,
                })
              }
            >
              Share leaderboard
            </Button>
            <Button size="sm" variant="flat" radius="full" onPress={() => navigate(boardPath)}>
              View leaderboard
            </Button>
          </div>
        </div>
      </div>

      {/* numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={<Users size={18} />} label="Players joined" value={stats.players} accent="bg-[#9747FF]" />
        <Stat icon={<FileText size={18} />} label="Entries" value={stats.entries} accent="bg-sky-500" />
        <Stat icon={<Heart size={18} />} label="Total votes" value={stats.votes} accent="bg-rose-500" />
        <Stat icon={<Wallet size={18} />} label="Earnings" value={naira(stats.earnings)} accent="bg-emerald-500" />
      </div>

      {/* players */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold text-gray-900 dark:text-white">Players</p>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-1.5">
            <Search size={14} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search players…"
              className="text-sm outline-none bg-transparent w-44"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-gray-400">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <InfiniteScroll
          dataLength={players.items.length}
          next={players.loadMore}
          hasMore={players.hasMore}
          loader={<Spinner />}
          endMessage={
            !players.loading && (
              <p className="text-center text-sm text-gray-400 py-4">
                {players.items.length === 0
                  ? query
                    ? "No players match your search."
                    : "None of your members have joined this challenge yet."
                  : "All players loaded."}
              </p>
            )
          }
        >
          {players.items.map((p) => {
            const name = `${p.user.firstName ?? ""} ${p.user.lastName ?? ""}`.trim() || p.user.username || "Member";
            return (
              <div key={p.user.id} className="flex items-center gap-3 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <span className="w-6 text-center text-sm font-bold text-gray-400 shrink-0">{p.rank ?? "–"}</span>
                <Avatar name={name} size={38} src={p.user.avatar} userId={p.user.id} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{name}</p>
                  {p.entryTitle && (
                    <p className="text-xs text-gray-400 truncate">
                      {p.entryId ? (
                        <Link to={`/mag-challenge/submission/${p.entryId}`} className="hover:text-primary hover:underline">
                          {p.entryTitle}
                        </Link>
                      ) : (
                        p.entryTitle
                      )}
                      {p.entryUrl && (
                        <a href={p.entryUrl} target="_blank" rel="noreferrer" className="ml-1 inline-block align-middle text-primary">
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </p>
                  )}
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 dark:text-white shrink-0">
                  <Heart size={13} className="text-rose-500" fill="currentColor" />
                  {p.votes}
                </span>
                <span className="text-sm font-bold text-emerald-600 w-16 text-right shrink-0">{naira(p.earnings)}</span>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>

      <ShareModal
        open={!!share}
        onClose={() => setShare(null)}
        url={share?.url}
        heading={share?.heading}
        subtitle={share?.subtitle}
        message={share?.message}
      />
    </div>
  );
};

export default ClubChallengeDashboardPage;