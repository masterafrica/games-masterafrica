// (4) USER SIDE — everything I've submitted.  Route: /user/mag-challenge/my-submissions
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft, ExternalLink, Heart, Share2 } from "lucide-react";
import { useState } from "react";
// import ShareModal from "@/components/dailychalanges/ShareModal";
import { useGetMySubmissions, type Submission } from "@/lib/graphql";
import { CategoryBadge, Spinner, StatusPill, usePaginated } from "@/components/dailychalanges/magshared";
import { getreadabledate } from "@/utils";
import ShareModal from "@/components/dailychalanges/sharemodal";

const MagMySubmissionsPage = () => {
  const navigate = useNavigate();
  const [getMine] = useGetMySubmissions();
  const [share, setShare] = useState<Submission | null>(null);

  const list = usePaginated<Submission, { totalSubmissions: number; totalVotes: number; categories: string[] }>(
    async (page) => {
      const res = await getMine({ variables: { input: { page } } });
      return res.data?.GetMySubmissions;
    },
    [],
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <button
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My submissions</h1>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            ["Entries", list.meta?.totalSubmissions ?? "–"],
            ["Total votes", list.meta?.totalVotes ?? "–"],
            ["Categories", list.meta?.categories?.length ?? "–"],
          ].map(([label, val]) => (
            <div
              key={label}
              className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-center"
            >
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{val}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        <InfiniteScroll
          dataLength={list.items.length}
          next={list.loadMore}
          hasMore={list.hasMore}
          loader={<Spinner />}
          endMessage={
            !list.loading && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-400 mb-3">
                  {list.items.length === 0 ? "You haven't submitted anything yet." : "That's all your entries."}
                </p>
                {list.items.length === 0 && (
                  <Button color="primary" radius="full" onPress={() => navigate("/mag-challenge")}>
                    Enter the challenge
                  </Button>
                )}
              </div>
            )
          }
        >
          <div className="space-y-3">
            {list.items.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex items-start gap-3"
              >
                <div className="flex-1 min-w-0">
                  <button
                    className="text-left font-semibold text-gray-900 dark:text-white hover:text-primary"
                    onClick={() => navigate(`/user/mag-challenge/submission/${s.id}`)}
                  >
                    {s.title}
                  </button>
                  {s.description && <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{s.description}</p>}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <CategoryBadge category={s.category} />
                    <StatusPill qualified={s.qualified} />
                    <span className="text-[11px] text-gray-400">{getreadabledate(s.createdAt)}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="flex items-center gap-1 text-sm font-bold text-gray-900 dark:text-white">
                    <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
                    {s.voteCount}
                  </span>
                  <div className="flex items-center gap-3 text-[#9747FF]">
                    <button aria-label="Share entry" onClick={() => setShare(s)}>
                      <Share2 size={15} />
                    </button>
                    <a href={s.url} target="_blank" rel="noreferrer" aria-label="Open entry">
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>

      <ShareModal open={!!share} onClose={() => setShare(null)} submissionId={share?.id ?? null} title={share?.title} />
    </div>
  );
};

export default MagMySubmissionsPage;