// (2) ADMIN SIDE — leaderboard of a challenge week.  Route: /admin/mag-challenge/leaderboard
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ExternalLink, History, Trophy, Users, X } from "lucide-react";
import {
  useGetLeaderboard,
  useGetVoters,
  type LeaderboardEntry,
  type VoterEntry,
  type SubUser,
} from "@/lib/graphql";
import { getreadabledate } from "@/utils";
import {
  Avatar,
  CategoryBadge,
  CategoryFilter,
  Spinner,
  WeekSwitcher,
  mondayOf,
  usePaginated,
} from "@/components/dailychalanges/magshared";

/* ── voters modal (own pagination) ── */
const VotersModal = ({ user, week, onClose }: { user: SubUser; week: string; onClose: () => void }) => {
  const [getVoters] = useGetVoters();
  const list = usePaginated<VoterEntry>(
    async (page) => {
      const res = await getVoters({ variables: { input: { page, userId: user.id, weekStart: week } } });
      return res.data?.GetVoters;
    },
    [user.id, week],
  );

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
      <div
        id="voters-scroll"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 truncate">Voters for {user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-400">{list.items.length} loaded</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg border border-gray-200 text-gray-500">
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-3">
          <InfiniteScroll
            dataLength={list.items.length}
            next={list.loadMore}
            hasMore={list.hasMore}
            loader={<Spinner />}
            scrollableTarget="voters-scroll"
            endMessage={
              !list.loading && (
                <p className="text-center text-sm text-gray-400 py-4">
                  {list.items.length === 0 ? "No voters this week." : "All voters loaded."}
                </p>
              )
            }
          >
            {list.items.map((v, i) => {
              const name = `${v.voter.firstName} ${v.voter.lastName}`;
              return (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <Avatar name={name} size={32} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{v.voter.email}</p>
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap">{getreadabledate(v.votedAt)}</span>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

/* ── page ── */
const AdminChallengeLeaderboardPage = () => {
  const navigate = useNavigate();
  const [week, setWeek] = useState(mondayOf());
  const [category, setCategory] = useState("");
  const [votersFor, setVotersFor] = useState<SubUser | null>(null);
  const [getBoard] = useGetLeaderboard();

  const list = usePaginated<LeaderboardEntry>(
    async (page) => {
      const res = await getBoard({
        variables: { input: { page, weekStart: week, category: category || undefined } },
      });
      return res.data?.GetLeaderboard;
    },
    [week, category],
  );

  return (
    <div className="container mx-auto overflow-hidden">
      <div className="py-12 px-3">
        <div className="flex justify-center items-center gap-2 mb-6 text-secondary">
          <Trophy size={18} />
          <p>Challenge Leaderboard</p>
        </div>
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary">LEADERBOARD</h1>
          <p className="opacity-80">Players ranked by votes received in the selected challenge week.</p>
        </div>
      </div>

      <div className="max-w-5xl px-4 mx-auto mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <WeekSwitcher value={week} onChange={setWeek} />
          <span className="ml-auto text-sm text-gray-400">{list.items.length} loaded</span>
        </div>
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      <div className="max-w-5xl px-4 mx-auto pb-12">
        <InfiniteScroll
          dataLength={list.items.length}
          next={list.loadMore}
          hasMore={list.hasMore}
          loader={<Spinner />}
          endMessage={
            !list.loading && (
              <p className="text-center text-sm text-gray-400 py-8">
                {list.items.length === 0 ? "No votes recorded for this week." : "End of leaderboard."}
              </p>
            )
          }
        >
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[48px_1.6fr_80px_90px_1.2fr_1.4fr] gap-3 px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400 border-b border-gray-100">
                <span>#</span>
                <span>Player</span>
                <span>Votes</span>
                <span>Entries</span>
                <span>Skill interest</span>
                <span>Actions</span>
              </div>

              {list.items.map((e) => {
                const name = `${e.user.firstName} ${e.user.lastName}`;
                return (
                  <div
                    key={e.user.id}
                    className="grid grid-cols-[48px_1.6fr_80px_90px_1.2fr_1.4fr] gap-3 px-5 py-3.5 items-center border-b border-gray-50 last:border-0 hover:bg-[#9747FF]/5"
                  >
                    <span className="font-bold text-gray-500">{e.rank}</span>
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar name={name} size={34} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{e.user.email}</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">{e.voteCount}</span>
                    <span className="text-sm text-gray-600">{e.submissionsCount}</span>
                    <div className="flex flex-wrap gap-1">
                      {e.categories.map((c) => (
                        <CategoryBadge key={c} category={c} />
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#9747FF]">
                      {e.topSubmission?.url && (
                        <a
                          href={e.topSubmission.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 hover:underline"
                        >
                          View <ExternalLink size={12} />
                        </a>
                      )}
                      <button
                        className="inline-flex items-center gap-1 hover:underline"
                        onClick={() => navigate(`/admin/mag-challenge/submissions/${e.user.id}`)}
                      >
                        History <History size={12} />
                      </button>
                      <button className="inline-flex items-center gap-1 hover:underline" onClick={() => setVotersFor(e.user)}>
                        Voters <Users size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>

      {votersFor && <VotersModal user={votersFor} week={week} onClose={() => setVotersFor(null)} />}
    </div>
  );
};

export default AdminChallengeLeaderboardPage;