// (5) ADMIN SIDE — all submissions of one user.  Route: /admin/submissions/user/:userId
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";
import {
  useGetUserSubmissions,
  useSetSubmissionQualified,
  type Submission,
  type SubUser,
} from "@/lib/graphql";
import { getreadabledate } from "@/utils";
import { Avatar, CategoryBadge, Spinner, StatusPill, errMsg, usePaginated } from "@/components/dailychalanges/magshared";

type Meta = { user: SubUser; totalSubmissions: number; totalVotes: number; categories: string[] };

const AdminUserSubmissionsPage = () => {
  const { userId = "" } = useParams();
  const navigate = useNavigate();
  const [getSubs] = useGetUserSubmissions();
  const { setQualified, loading: saving } = useSetSubmissionQualified();

  const list = usePaginated<Submission, Meta>(
    async (page) => {
      const res = await getSubs({ variables: { input: { page, userId } } });
      return res.data?.GetUserSubmissions;
    },
    [userId],
  );

  const user = list.meta?.user;
  const name = user ? `${user.firstName} ${user.lastName}` : "";

  const toggleQualified = async (s: Submission) => {
    try {
      const res = await setQualified({ submissionId: s.id, qualified: !s.qualified });
      const q = res.data?.SetSubmissionQualified;
      if (q) {
        list.setItems((prev) => prev.map((x) => (x.id === s.id ? { ...x, qualified: q.qualified } : x)));
        toast.success(q.qualified ? "Marked as qualified" : "Qualification removed");
      }
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* user header */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 mb-6 flex flex-wrap items-center gap-4">
        {user ? (
          <>
            <Avatar name={name} size={52} />
            <div className="flex-1 min-w-[180px]">
              <p className="font-bold text-lg text-gray-900">{name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {(list?.meta?.categories??[]).map((c) => (
                  <CategoryBadge key={c} category={c} />
                ))}
              </div>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{list.meta?.totalSubmissions}</p>
                <p className="text-xs text-gray-400">Entries</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{list.meta?.totalVotes}</p>
                <p className="text-xs text-gray-400">Total votes</p>
              </div>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>

      <InfiniteScroll
        dataLength={list.items.length}
        next={list.loadMore}
        hasMore={list.hasMore}
        loader={<Spinner />}
        endMessage={
          !list.loading && (
            <p className="text-center text-sm text-gray-400 py-8">
              {list.items.length === 0 ? "No submissions found." : "All submissions loaded."}
            </p>
          )
        }
      >
        <div className="space-y-3">
          {list.items.map((s) => (
            <div key={s.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{s.title}</p>
                {s.description && <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{s.description}</p>}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <CategoryBadge category={s.category} />
                  <StatusPill qualified={s.qualified} />
                  <span className="text-[11px] text-gray-400">{getreadabledate(s.createdAt)}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="flex items-center gap-1 text-sm font-bold text-gray-900">
                  <Heart size={14} className="text-rose-500" fill="currentColor" /> {s.voteCount}
                </span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#9747FF] font-medium hover:underline"
                >
                  View post <ExternalLink size={12} />
                </a>
                <button
                  disabled={saving}
                  onClick={() => toggleQualified(s)}
                  className="text-xs font-semibold px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                >
                  {s.qualified ? "Unqualify" : "Mark qualified"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AdminUserSubmissionsPage;