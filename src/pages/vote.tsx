// USER — vote for entries of ONE challenge.  Route: /mag-challenge/:slug/vote  (inside ProtectedRoute / MainLayout)
import { useState } from "react";
import { Button } from "@heroui/button";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft, ExternalLink, Heart, Share2, Trophy } from "lucide-react";
import { useGetVotingSubmissions, useToggleVote, type Challenge, type VotingSubmission } from "@/lib/graphql";
import { Avatar, CategoryBadge, Spinner, errMsg, usePaginated, votingText } from "@/components/dailychalanges/magshared";
import ShareModal from "@/components/dailychalanges/sharemodal";

const MagVotePage = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const [pending, setPending] = useState<string | null>(null);
  const [share, setShare] = useState<{ id: string; title?: string } | null>(null);

  const [getList] = useGetVotingSubmissions();
  const { toggleVote } = useToggleVote();

  const list = usePaginated<VotingSubmission, { challenge: Challenge }>(
    async (page) => {
      const res = await getList({ variables: { input: { page, slug } } });
      return res.data?.GetVotingSubmissions;
    },
    [slug],
  );

  const challenge = list.meta?.challenge;
  const closed = !!challenge && !challenge.isVotingOpen; // not started yet, switched off, or challenge ended

  const handleVote = async (id: string) => {
    setPending(id);
    try {
      const res = await toggleVote({ submissionId: id });
      const t = res.data?.ToggleVote;
      if (t) {
        list.setItems((prev) =>
          prev.map((x) =>
            x.submission.id === id
              ? { hasVoted: t.voted, submission: { ...x.submission, voteCount: t.voteCount } }
              : x,
          ),
        );
        toast.success(t.voted ? "Vote cast!" : "Vote removed");
      }
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6">
        <button
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-6"
          onClick={() => navigate(`/mag-challenge/${slug}`)}
        >
          <ArrowLeft className="w-4 h-4" /> {challenge?.title ?? "Back"}
        </button>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Vote for your <span className="text-primary">favourite</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {challenge ? <b>{challenge.title}</b> : "Loading..."}
            {challenge?.prize ? <> · {challenge.prize}</> : null}
          </p>
          <p className="text-sm text-gray-500 mt-1">One vote per entry.</p>
          {closed && (
            <p className="mt-3 inline-block rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm px-4 py-2">
              {challenge ? votingText(challenge) : ""}. You can still look at the entries.
            </p>
          )}
          <div>
            <Button
              className="mt-4"
              variant="flat"
              color="primary"
              radius="full"
              startContent={<Trophy className="w-4 h-4" />}
              onPress={() => navigate(`/mag-challenge/${slug}/leaderboard`)}
            >
              View leaderboard
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <InfiniteScroll
            dataLength={list.items.length}
            next={list.loadMore}
            hasMore={list.hasMore}
            loader={<Spinner />}
            endMessage={
              !list.loading && (
                <p className="text-center text-sm text-gray-400 py-8">
                  {list.items.length === 0 ? "No entries to vote on yet." : "That's everyone!"}
                </p>
              )
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.items.map(({ submission: s, hasVoted }) => {
                const name = `${s.user.firstName} ${s.user.lastName}`;
                return (
                  <div
                    key={s.id}
                    className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm flex flex-col"
                  >
                    <div className="p-5 flex-1 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={name} size={34} />
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{name}</p>
                      </div>
                      <div>
                        <button
                          className="text-left font-semibold text-gray-900 dark:text-white leading-snug mb-1 hover:text-primary"
                          onClick={() => navigate(`/mag-challenge/submission/${s.id}`)}
                        >
                          {s.title}
                        </button>
                        {s.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{s.description}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <CategoryBadge category={s.category} />
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#9747FF] font-medium hover:underline"
                        >
                          Watch entry <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50 dark:border-gray-800">
                      <span className="text-sm text-gray-500">
                        <b className="text-gray-900 dark:text-white">{s.voteCount}</b> vote{s.voteCount !== 1 && "s"}
                      </span>
                      <button
                        aria-label="Share entry"
                        className="text-gray-400 hover:text-primary"
                        onClick={() => setShare({ id: s.id, title: s.title })}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <Button
                        size="sm"
                        radius="full"
                        color="primary"
                        variant={hasVoted ? "flat" : "solid"}
                        isDisabled={closed}
                        isLoading={pending === s.id}
                        startContent={<Heart className="w-4 h-4" fill={hasVoted ? "currentColor" : "none"} />}
                        onPress={() => handleVote(s.id)}
                      >
                        {hasVoted ? "Voted" : "Vote"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>

      <ShareModal open={!!share} onClose={() => setShare(null)} submissionId={share?.id ?? null} title={share?.title} />
    </div>
  );
};

export default MagVotePage;