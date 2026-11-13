// PUBLIC — leaderboard of a club inside one challenge (shareable).
// Route: /club/:slug/:challengeSlug/leaderboard   (OUTSIDE ProtectedRoute)
// Only the club's members are ranked. No emails, no earnings.
import { useState } from "react";
import { Button } from "@heroui/button";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ExternalLink, Heart, Share2 } from "lucide-react";
import { useGetClubChallengeLeaderboard, type ClubLeaderboardEntry, type ClubChallengeLeaderboard } from "@/lib/graphql";
import { Avatar, ChallengeStateBadge, Spinner, usePaginated } from "@/components/dailychalanges/magshared";
import ShareModal from "@/components/dailychalanges/sharemodal";

const MEDALS = ["🥇", "🥈", "🥉"];

const ClubLeaderboardPage = () => {
  const { slug = "", challengeSlug = "" } = useParams();
  const navigate = useNavigate();
  const loggedIn = !!Cookies.get("accessToken");
  const [getBoard] = useGetClubChallengeLeaderboard();
  const [shareOpen, setShareOpen] = useState(false);

  const list = usePaginated<ClubLeaderboardEntry, Omit<ClubChallengeLeaderboard, "data" | "hasMore" | "nextPage">>(
    async (page) => {
      const r = await getBoard({ variables: { input: { clubSlug: slug, challengeSlug, page } } });
      return r.data?.GetClubChallengeLeaderboard;
    },
    [slug, challengeSlug],
  );

  const meta = list.meta;
  const missing = !list.loading && !meta;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-2xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold text-gray-900 dark:text-white">
            MAG <span className="text-primary">Clubs</span>
          </Link>
          {!loggedIn && (
            <Link to="/auth/login" className="text-sm font-semibold text-primary">
              Log in
            </Link>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {list.loading && !meta && <Spinner />}
        {missing && <p className="text-center text-gray-500 py-16">We couldn&apos;t find this leaderboard.</p>}

        {meta && (
          <>
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-wide text-gray-400">{meta.clubName}</p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                <span className="text-primary">Club leaderboard</span>
              </h1>
              <div className="flex items-center justify-center gap-3 mt-2">
                <b className="text-gray-800 dark:text-gray-200">{meta.challengeTitle}</b>
                <ChallengeStateBadge open={!!meta.challengeOpen} />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                <Button
                  variant="flat"
                  color="primary"
                  radius="full"
                  startContent={<Share2 className="w-4 h-4" />}
                  onPress={() => setShareOpen(true)}
                >
                  Share
                </Button>
                {!!meta.challengeOpen && (
                  <Button color="primary" radius="full" onPress={() => navigate(`/mag-challenge/${meta.challengeSlug}/vote`)}>
                    Go vote
                  </Button>
                )}
              </div>
            </div>

            <InfiniteScroll
              dataLength={list.items.length}
              next={list.loadMore}
              hasMore={list.hasMore}
              loader={<Spinner />}
              endMessage={
                !list.loading && (
                  <p className="text-center text-sm text-gray-400 py-8">
                    {list.items.length === 0 ? "No one from this club has entered yet." : "End of leaderboard."}
                  </p>
                )
              }
            >
              <div className="space-y-3">
                {list.items.map((e) => {
                  const top = e.rank <= 3;
                  return (
                    <div
                      key={e.userId}
                      className={`flex items-center gap-4 rounded-2xl border p-4 ${
                        top
                          ? "bg-amber-50/60 dark:bg-amber-900/10 border-amber-200 dark:border-amber-700/30"
                          : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
                      }`}
                    >
                      <div className="w-9 text-center text-lg font-bold text-gray-500 shrink-0">
                        {top ? MEDALS[e.rank - 1] : e.rank}
                      </div>
                      <Avatar name={e.name} size={40} src={e.avatar} userId={loggedIn ? e.userId : undefined} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">{e.name}</p>
                        {e.entryId && (
                          <Link
                            to={`/mag-challenge/submission/${e.entryId}`}
                            className="inline-flex items-center gap-1 text-xs text-[#9747FF] font-medium hover:underline"
                          >
                            {e.entryTitle || "View entry"} <ExternalLink size={11} />
                          </Link>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-900 dark:text-white font-bold shrink-0">
                        <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
                        {e.votes}
                      </div>
                    </div>
                  );
                })}
              </div>
            </InfiniteScroll>
          </>
        )}
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={window.location.href}
        heading="Share this leaderboard"
        subtitle="Anyone with this link can see how the club is doing."
        message={meta ? `See how ${meta.clubName} is doing in "${meta.challengeTitle}" on MAG!` : undefined}
      />
    </div>
  );
};

export default ClubLeaderboardPage;