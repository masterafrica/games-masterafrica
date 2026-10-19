// ADMIN — list of all challenges.  Route: admin/mag-challenges
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft, Heart, Plus, Trophy, Users, FileText } from "lucide-react";
import { useGetAdminChallenges, type ChallengeWithStats } from "@/lib/graphql";
import { ChallengeStateBadge, Spinner, endsLabel, usePaginated } from "@/components/dailychalanges/magshared";

const TABS = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "ended", label: "Ended" },
] as const;

const AdminChallengesPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"all" | "open" | "ended">("all");
  const [getList] = useGetAdminChallenges();

  const list = usePaginated<ChallengeWithStats>(
    async (page) => {
      const res = await getList({ variables: { input: { page, status } } });
      return res.data?.GetAdminChallenges;
    },
    [status],
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6">
        <ArrowLeft size={16} /> Dashboard
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Challenges</h1>
          <p className="text-sm text-gray-500">Every challenge has its own entries, votes and leaderboard.</p>
        </div>
        <button
          onClick={() => navigate("/admin/mag-challenges/new")}
          className="inline-flex items-center gap-2 rounded-xl bg-[#9747FF] text-white font-semibold text-sm px-4 py-2.5 hover:opacity-90"
        >
          <Plus size={16} /> New challenge
        </button>
      </div>

      <div className="flex gap-2 mb-5">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setStatus(t.key)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              status === t.key
                ? "bg-[#9747FF] text-white border-[#9747FF]"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <InfiniteScroll
        dataLength={list.items.length}
        next={list.loadMore}
        hasMore={list.hasMore}
        loader={<Spinner />}
        endMessage={
          !list.loading && (
            <p className="text-center text-sm text-gray-400 py-8">
              {list.items.length === 0 ? "No challenges yet. Create the first one!" : "All challenges loaded."}
            </p>
          )
        }
      >
        <div className="space-y-3">
          {list.items.map(({ challenge: c, entriesCount, votesCount, participantsCount }) => (
            <button
              key={c.id}
              onClick={() => navigate(`/admin/mag-challenges/${c.id}`)}
              className="w-full text-left bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-4 flex items-center gap-4"
            >
              {c.image ? (
                <img alt="" src={c.image} className="w-20 h-20 rounded-xl object-cover shrink-0" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#9747FF] to-violet-600 flex items-center justify-center shrink-0">
                  <Trophy className="text-amber-300" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-gray-900 truncate">{c.title}</p>
                  <ChallengeStateBadge open={c.isOpen} />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  /mag-challenge/{c.slug} · {endsLabel(c.endsAt, c.isOpen)}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1.5">
                    <FileText size={14} className="text-gray-400" /> <b>{entriesCount}</b> entries
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users size={14} className="text-gray-400" /> <b>{participantsCount}</b> players
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Heart size={14} className="text-rose-500" fill="currentColor" /> <b>{votesCount}</b> votes
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AdminChallengesPage;