// (1) USER SIDE — vote for entries.  Route: /user/mag-challenge/vote
import { useState } from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft, ExternalLink, Heart, Share2, Trophy } from "lucide-react";
// import ShareModal from "@/components/dailychalanges/ShareModal";
import {
  useGetVotingSubmissions,
  useToggleVote,
  type VotingSubmission,
} from "@/lib/graphql";
import {
  Avatar,
  CategoryBadge,
  CategoryFilter,
  Spinner,
  WeekSwitcher,
  errMsg,
  mondayOf,
  usePaginated,
} from "@/components/dailychalanges/magshared";
import ShareModal from "@/components/dailychalanges/sharemodal";

const MagVotePage = () => {
  const navigate = useNavigate();
  const [week, setWeek] = useState(mondayOf());
  const [category, setCategory] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [share, setShare] = useState<{ id: string; title?: string } | null>(null);

  const [getList] = useGetVotingSubmissions();
  const { toggleVote } = useToggleVote();

  const list = usePaginated<VotingSubmission>(
    async (page) => {
      const res = await getList({
        variables: { input: { page, weekStart: week, category: category || undefined } },
      });
      return res.data?.GetVotingSubmissions;
    },
    [week, category],
  );

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
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Vote for your <span className="text-primary">favourite</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            One vote per entry. The entry with the highest votes wins ₦10,000.
          </p>
          <Button
            className="mt-4"
            variant="flat"
            color="primary"
            radius="full"
            startContent={<Trophy className="w-4 h-4" />}
            onPress={() => navigate("/user/mag-challenge/leaderboard")}
          >
            View leaderboard
          </Button>
        </div>

        <div className="max-w-5xl mx-auto mb-6 flex flex-col items-center gap-4">
          <WeekSwitcher value={week} onChange={setWeek} />
          <CategoryFilter value={category} onChange={setCategory} />
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
                  {list.items.length === 0 ? "No entries open for voting this week yet." : "That's everyone!"}
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