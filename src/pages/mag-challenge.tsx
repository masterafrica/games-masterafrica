// USER — list of challenges.  Route: mag-challenge   (inside ProtectedRoute / MainLayout)
import { useState } from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { History, Trophy, Vote } from "lucide-react";
import { useGetChallenges, type Challenge } from "@/lib/graphql";
import { ChallengeStateBadge, Spinner, endsLabel, usePaginated, votingText } from "@/components/dailychalanges/magshared";

const ChallengeCard = ({ c }: { c: Challenge }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden flex flex-col">
      <button onClick={() => navigate(`/mag-challenge/${c.slug}`)} className="block text-left">
        {c.image ? (
          <img alt={c.title} src={c.image} className="w-full h-44 object-cover" />
        ) : (
          <div className="w-full h-44 bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-amber-300" />
          </div>
        )}
      </button>

      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <ChallengeStateBadge open={c.isOpen} />
          <span className="text-xs text-gray-500">{endsLabel(c.endsAt, c.isOpen)}</span>
        </div>

        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-snug">{c.title}</h3>
          {c.tagline && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{c.tagline}</p>}
        </div>

        {c.prize && (
          <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <Trophy className="w-4 h-4" /> {c.prize}
          </p>
        )}

        <p className="text-xs text-gray-400">{votingText(c)}</p>

        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          <Button
            size="sm"
            radius="full"
            color="primary"
            onPress={() => navigate(`/mag-challenge/${c.slug}`)}
          >
            {c.isOpen ? "Join" : "View"}
          </Button>
          <Button
            size="sm"
            radius="full"
            variant="flat"
            startContent={<Vote className="w-4 h-4" />}
            onPress={() => navigate(`/mag-challenge/${c.slug}/vote`)}
          >
            Vote
          </Button>
          <Button
            size="sm"
            radius="full"
            variant="flat"
            startContent={<Trophy className="w-4 h-4" />}
            onPress={() => navigate(`/mag-challenge/${c.slug}/leaderboard`)}
          >
            Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
};

const MagChallengesPage = () => {
  const navigate = useNavigate();
  const [getChallenges] = useGetChallenges();
  const [showEnded, setShowEnded] = useState(false);

  const open = usePaginated<Challenge>(async (page) => {
    const res = await getChallenges({ variables: { input: { page, status: "open" } } });
    return res.data?.GetChallenges;
  }, []);

  // only fetched once "show ended" is switched on
  const ended = usePaginated<Challenge>(
    async (page) => {
      if (!showEnded) return null;
      const res = await getChallenges({ variables: { input: { page, status: "ended" } } });
      return res.data?.GetChallenges;
    },
    [showEnded],
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Trophy className="w-4 h-4" /> MAG Challenges
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Show Us What You&apos;ve <span className="text-primary">Got</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Pick a challenge, post your entry, share your link and collect votes to win.
          </p>
          <Button
            className="mt-4"
            variant="flat"
            color="primary"
            radius="full"
            startContent={<History className="w-4 h-4" />}
            onPress={() => navigate("/user/mag-challenge/my-submissions")}
          >
            My submissions
          </Button>
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Open challenges</h2>

          {open.loading && open.items.length === 0 && <Spinner />}
          {!open.loading && open.items.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-10">No open challenges right now. Check back soon!</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {open.items.map((c) => (
              <ChallengeCard key={c.id} c={c} />
            ))}
          </div>

          {open.hasMore && !open.loading && open.items.length > 0 && (
            <div className="text-center mt-6">
              <Button variant="flat" radius="full" onPress={open.loadMore}>
                Load more
              </Button>
            </div>
          )}

          <div className="mt-12">
            <button
              className="text-sm font-semibold text-primary hover:underline"
              onClick={() => setShowEnded((s) => !s)}
            >
              {showEnded ? "Hide ended challenges" : "Show ended challenges"}
            </button>

            {showEnded && (
              <div className="mt-4">
                {ended.loading && ended.items.length === 0 && <Spinner />}
                {!ended.loading && ended.items.length === 0 && (
                  <p className="text-sm text-gray-400 py-4">No ended challenges yet.</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {ended.items.map((c) => (
                    <ChallengeCard key={c.id} c={c} />
                  ))}
                </div>
                {ended.hasMore && !ended.loading && ended.items.length > 0 && (
                  <div className="text-center mt-6">
                    <Button variant="flat" radius="full" onPress={ended.loadMore}>
                      Load more
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagChallengesPage;