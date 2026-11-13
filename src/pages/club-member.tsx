// CLUB OWNER — details of one member: challenges they joined and what each earned the owner.
// Route: /my-club/members/:userId
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft, FileText, Heart, Trophy, Wallet } from "lucide-react";
import {
  useGetMyClubMember,
  useGetMyClubMemberChallenges,
  type ClubMemberDetail,
  type MemberChallengeRow,
} from "@/lib/graphql";
import { Avatar, ChallengeStateBadge, Spinner, naira, usePaginated } from "@/components/dailychalanges/magshared";
import { getreadabledate } from "@/utils";

const ClubMemberPage = () => {
  const { userId = "" } = useParams();
  const navigate = useNavigate();
  const [getMember] = useGetMyClubMember();
  const [getChallenges] = useGetMyClubMemberChallenges();

  const [member, setMember] = useState<ClubMemberDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await getMember({ variables: { input: { userId } } });
        setMember(r.data?.GetMyClubMember ?? null);
      } catch {
        setMember(null);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const list = usePaginated<MemberChallengeRow>(
    async (page) => {
      const r = await getChallenges({ variables: { input: { userId, page } } });
      return r.data?.GetMyClubMemberChallenges;
    },
    [userId],
  );

  if (loading) return <Spinner />;
  if (!member) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">That person isn&apos;t in your club.</p>
        <Link to="/my-club" className="text-primary font-semibold">
          Back to my club
        </Link>
      </div>
    );
  }

  const u = member.user;
  const name = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.username || "Member";

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
      <button className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary" onClick={() => navigate("/my-club")}>
        <ArrowLeft size={16} /> My club
      </button>

      {/* member */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
        <div className="flex items-center gap-4">
          <Avatar name={name} size={64} src={u.avatar} userId={u.id} />
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">{name}</h1>
            {u.username && <p className="text-sm text-gray-400">@{u.username}</p>}
            <p className="text-xs text-gray-400 mt-1">Joined the club {getreadabledate(member.joinedAt)}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 text-center">
            <Trophy className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900 dark:text-white">{member.challengesCount}</p>
            <p className="text-[11px] text-gray-500">Challenges</p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 text-center">
            <FileText className="w-4 h-4 text-sky-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900 dark:text-white">{member.entriesCount}</p>
            <p className="text-[11px] text-gray-500">Entries</p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 text-center">
            <Wallet className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-emerald-600">{naira(member.totalEarnings)}</p>
            <p className="text-[11px] text-gray-500">Earned for you</p>
          </div>
        </div>
      </div>

      {/* challenges joined */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
        <p className="font-semibold text-gray-900 dark:text-white">Challenges joined</p>
        <InfiniteScroll
          dataLength={list.items.length}
          next={list.loadMore}
          hasMore={list.hasMore}
          loader={<Spinner />}
          endMessage={
            !list.loading && (
              <p className="text-center text-sm text-gray-400 py-4">
                {list.items.length === 0 ? "This member hasn't joined a challenge yet." : "That's everything."}
              </p>
            )
          }
        >
          {list.items.map((r) => (
            <button
              key={r.challenge.id}
              onClick={() => navigate(`/my-club/challenges/${r.challenge.id}`)}
              className="w-full text-left flex items-center gap-3 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-primary/5 rounded-lg px-1"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{r.challenge.title}</p>
                  <ChallengeStateBadge open={r.challenge.isOpen} />
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {r.entryTitle ? `“${r.entryTitle}” · ` : ""}
                  {r.entries} entr{r.entries === 1 ? "y" : "ies"}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 dark:text-white shrink-0">
                <Heart size={13} className="text-rose-500" fill="currentColor" />
                {r.votes}
              </span>
              <span className="text-sm font-bold text-emerald-600 w-16 text-right shrink-0">{naira(r.earnings)}</span>
            </button>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ClubMemberPage;