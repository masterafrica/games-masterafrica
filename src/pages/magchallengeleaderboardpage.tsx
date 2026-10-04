// (3) USER SIDE — leaderboard.  Route: /mag-challenge/leaderboard
import { useState } from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";
import { useGetLeaderboard, type LeaderboardEntry } from "@/lib/graphql";
import {
  Avatar,
  CategoryBadge,
  CategoryFilter,
  Spinner,
  WeekSwitcher,
  mondayOf,
  usePaginated,
} from "@/components/dailychalanges/magshared";

const MEDALS = ["🥇", "🥈", "🥉"];

const MagLeaderboardPage = () => {
  const navigate = useNavigate();
  const [week, setWeek] = useState(mondayOf());
  const [category, setCategory] = useState("");
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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6">
        <button
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            MAG <span className="text-primary">Leaderboard</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Highest votes at the end of the week wins ₦10,000.</p>
          <Button className="mt-4" color="primary" radius="full" onPress={() => navigate("/mag-challenge/vote")}>
            Go vote
          </Button>
        </div>

        <div className="max-w-2xl mx-auto mb-6 flex flex-col items-center gap-4">
          <WeekSwitcher value={week} onChange={setWeek} />
          <CategoryFilter value={category} onChange={setCategory} />
        </div>

        <div className="max-w-2xl mx-auto">
          <InfiniteScroll
            dataLength={list.items.length}
            next={list.loadMore}
            hasMore={list.hasMore}
            loader={<Spinner />}
            endMessage={
              !list.loading && (
                <p className="text-center text-sm text-gray-400 py-8">
                  {list.items.length === 0 ? "No votes yet this week. Be the first!" : "End of leaderboard."}
                </p>
              )
            }
          >
            <div className="space-y-3">
              {list.items.map((e) => {
                const name = `${e.user.firstName} ${e.user.lastName}`;
                const top = e.rank <= 3;
                return (
                  <div
                    key={e.user.id}
                    className={`flex items-center gap-4 rounded-2xl border p-4 ${
                      top
                        ? "bg-amber-50/60 dark:bg-amber-900/10 border-amber-200 dark:border-amber-700/30"
                        : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
                    }`}
                  >
                    <div className="w-9 text-center text-lg font-bold text-gray-500 shrink-0">
                      {top ? MEDALS[e.rank - 1] : e.rank}
                    </div>
                    <Avatar name={name} size={40} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">{name}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        {e.categories.slice(0, 2).map((c) => (
                          <CategoryBadge key={c} category={c} />
                        ))}
                        {e.topSubmission?.url && (
                          <a
                            href={e.topSubmission.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#9747FF] font-medium hover:underline"
                          >
                            View entry <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-900 dark:text-white font-bold shrink-0">
                      <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
                      {e.voteCount}
                    </div>
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default MagLeaderboardPage;