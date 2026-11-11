// ADMIN DASHBOARD (replaces the analytics page): player stats + MAG challenges overview + navigation.
// Routes: admin/dashboard (and admin)
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  FileText,
  Heart,
  LogIn,
  Plus,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import {
  useGetAdminChallenges,
  useGetAdminClubs,
  useGetChallengeOverview,
  useGetLoginStats,
  useGetRecentSignUpUsers,
  useGetSignUpGraph,
  useGetSocialPostSubmissions,
  type ChallengeOverview,
  type ChallengeWithStats,
  type ClubInfo,
  type GetSocialPost,
  type SignupGraphPoint,
  type User,
} from "@/lib/graphql";
import { getreadabledate } from "@/utils";
import { Avatar, CategoryBadge, ChallengeStateBadge, endsLabel } from "@/components/dailychalanges/magshared";

/* ───────────── helpers ───────────── */

const fmt = (n: number) => n.toLocaleString();

const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export function convertToDailySignups(data: { date: string; totalSignups: number }[]) {
  return data.map((item) => ({ day: dayMap[new Date(item.date).getDay()], value: item.totalSignups }));
}

/* ───────────── small components ───────────── */

const StatCard = ({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
}) => (
  <div className="relative rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col gap-4 overflow-hidden hover:shadow-md transition-all duration-200">
    <div className={`absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-10 ${accent}`} />
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${accent}`}>{icon}</div>
    <div>
      <p className="text-3xl font-bold text-gray-900">{typeof value === "number" ? fmt(value) : value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  </div>
);

const BarChart = ({ data }: { data: { day: string; value: number }[] }) => {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2 h-24">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full rounded-t-md bg-[#9747FF] opacity-70 hover:opacity-100 transition-all cursor-pointer"
            style={{ height: `${(d.value / max) * 80}px` }}
            title={`${d.day}: ${d.value}`}
          />
          <span className="text-[10px] text-gray-400">{d.day}</span>
        </div>
      ))}
    </div>
  );
};

const SectionTitle = ({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) => (
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-bold text-gray-900">{children}</h2>
    {right}
  </div>
);

const ViewAll = ({ to }: { to: string }) => (
  <Link to={to} className="inline-flex items-center gap-1 text-xs font-semibold text-[#9747FF] hover:underline">
    View all <ArrowRight size={12} />
  </Link>
);

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: Activity },
  { to: "/admin/mag-challenges", label: "Challenges", icon: Trophy },
  { to: "/admin/mag-challenge/submissions", label: "All submissions", icon: FileText },
  { to: "/admin/clubs", label: "Clubs", icon: Users },
  // add more admin pages here
];

/* ───────────── page ───────────── */

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [getLoginStats] = useGetLoginStats();
  const [getSignUpGraph] = useGetSignUpGraph();
  const [getRecentSignUpUsers] = useGetRecentSignUpUsers();
  const [getOverview] = useGetChallengeOverview();
  const [getChallenges] = useGetAdminChallenges();
  const [getSubmissions] = useGetSocialPostSubmissions();
  const [getClubs] = useGetAdminClubs();

  const [statsData, setStatsData] = useState({
    todayLogins: 0,
    todaySignups: 0,
    totalSignups: 0,
    weekstats: { totalSignups: 0, totalLogins: 0 },
  });
  const [graphs, setGraphs] = useState<SignupGraphPoint[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [overview, setOverview] = useState<ChallengeOverview | null>(null);
  const [challenges, setChallenges] = useState<ChallengeWithStats[]>([]);
  const [latest, setLatest] = useState<GetSocialPost[]>([]);
  const [clubs, setClubs] = useState<ClubInfo[]>([]);

  const dailySignups = useMemo(() => convertToDailySignups(graphs), [graphs]);

  useEffect(() => {
    // each block loads independently so one failing query doesn't blank the dashboard
    (async () => {
      try {
        const r = await getLoginStats();
        if (r.data?.GetLoginStats) setStatsData(r.data.GetLoginStats);
      } catch (_) {}
    })();
    (async () => {
      try {
        const r = await getSignUpGraph();
        if (r.data?.GetSignupGraph) setGraphs(r.data.GetSignupGraph);
      } catch (_) {}
    })();
    (async () => {
      try {
        const r = await getRecentSignUpUsers();
        if (r.data?.GetRecentSignups) setUsers(r.data.GetRecentSignups);
      } catch (_) {}
    })();
    (async () => {
      try {
        const r = await getOverview();
        if (r.data?.GetChallengeOverview) setOverview(r.data.GetChallengeOverview);
      } catch (_) {}
    })();
    (async () => {
      try {
        const r = await getChallenges({ variables: { input: { page: 1, status: "all" } } });
        setChallenges((r.data?.GetAdminChallenges.data ?? []).slice(0, 5));
      } catch (_) {}
    })();
    (async () => {
      try {
        const r = await getSubmissions({ variables: { input: { page: 1 } } });
        setLatest((r.data?.GetSubmissions.data ?? []).slice(0, 5));
      } catch (_) {}
    })();
    (async () => {
      try {
        const r = await getClubs({ variables: { input: { page: 1 } } });
        setClubs((r.data?.GetAdminClubs.data ?? []).slice(0, 5));
      } catch (_) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playerStats = [
    { icon: <Users size={20} />, label: "Total Users", value: statsData?.totalSignups ?? 0, sub: "All registered accounts", accent: "bg-[#9747FF]" },
    { icon: <UserPlus size={20} />, label: "New Users Today", value: statsData?.todaySignups ?? 0, sub: "Since midnight", accent: "bg-[#FFD06A]" },
    { icon: <LogIn size={20} />, label: "Logins Today", value: statsData?.todayLogins ?? 0, sub: "Unique sessions today", accent: "bg-emerald-500" },
    { icon: <TrendingUp size={20} />, label: "Sign-ins This Week", value: statsData?.weekstats?.totalLogins ?? 0, sub: "This Week", accent: "bg-sky-500" },
  ];

  const challengeStats = [
    { icon: <Trophy size={20} />, label: "Open challenges", value: overview?.openChallenges ?? 0, sub: `${fmt(overview?.totalChallenges ?? 0)} in total`, accent: "bg-amber-500" },
    { icon: <FileText size={20} />, label: "Entries", value: overview?.totalEntries ?? 0, sub: "Across all challenges", accent: "bg-[#9747FF]" },
    { icon: <Heart size={20} />, label: "Votes", value: overview?.totalVotes ?? 0, sub: "Across all challenges", accent: "bg-rose-500" },
  ];

  return (
    <div className="container mx-auto overflow-hidden">
      {/* Hero */}
      <div className="relative mb-8 p-6 px-3 py-12">
        <div className="w-full opacity-50 md:opacity-100 absolute left-[-25%] md:left-[10%] flex justify-space-between pointer-events-none">
          <img alt="" src="/images/asset-1.png" width={120} />
        </div>
        <div className="absolute opacity-50 md:opacity-100 md:right-[10%] right-[-25%] top-[40%] pointer-events-none">
          <img alt="" src="/images/asset-2.png" width={120} />
        </div>

        <div className="flex justify-center items-center gap-2 mb-6 text-secondary">
          <Activity size={18} />
          <p>Admin Dashboard</p>
        </div>

        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary">DASHBOARD</h1>
          <p className="opacity-80">Player activity and your MAG challenges, all in one place.</p>
        </div>
      </div>

      {/* Navigation to the other admin pages */}
      <div className="max-w-6xl px-4 mx-auto mb-8">
        <nav className="flex flex-wrap justify-center gap-2">
          {NAV.map(({ to, label, icon: Icon }, i) => (
            <Link
              key={to}
              to={to}
              className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
                i === 0
                  ? "bg-[#9747FF] text-white border-[#9747FF]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#9747FF]/50 hover:text-[#9747FF]"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="max-w-6xl px-4 mx-auto space-y-10 pb-10">
        {/* ── Challenges ── */}
        <section className="space-y-4">
          <SectionTitle
            right={
              <button
                onClick={() => navigate("/admin/mag-challenges/new")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#9747FF] text-white font-semibold text-xs px-3 py-2 hover:opacity-90"
              >
                <Plus size={14} /> New challenge
              </button>
            }
          >
            MAG Challenges
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {challengeStats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* recent challenges */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Challenges</h3>
                <ViewAll to="/admin/mag-challenges" />
              </div>
              {challenges.length === 0 && <p className="text-sm text-gray-400 py-4">No challenges yet.</p>}
              <ul>
                {challenges.map(({ challenge: c, entriesCount, votesCount }) => (
                  <li key={c.id}>
                    <button
                      onClick={() => navigate(`/admin/mag-challenges/${c.id}`)}
                      className="w-full text-left flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 hover:bg-[#9747FF]/5 rounded-lg px-1"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-800 truncate">{c.title}</p>
                          <ChallengeStateBadge open={c.isOpen} />
                        </div>
                        <p className="text-[11px] text-gray-400">
                          {endsLabel(c.endsAt, c.isOpen)} · {entriesCount} entries · {votesCount} votes
                        </p>
                      </div>
                      <ArrowRight size={14} className="text-gray-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* latest submissions (all challenges) */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Latest submissions</h3>
                <ViewAll to="/admin/mag-challenge/submissions" />
              </div>
              {latest.length === 0 && <p className="text-sm text-gray-400 py-4">No submissions yet.</p>}
              <ul>
                {latest.map((s, i) => (
                  <li key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{s.title}</p>
                      <p className="text-[11px] text-gray-400 truncate">
                        {s.user.firstName} {s.user.lastName} · {getreadabledate(s.createdAt)}
                      </p>
                    </div>
                    <CategoryBadge category={s.category} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Clubs ── */}
        <section className="space-y-4">
          <SectionTitle
            right={
              <button
                onClick={() => navigate("/admin/clubs/new")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#9747FF] text-white font-semibold text-xs px-3 py-2 hover:opacity-90"
              >
                <Plus size={14} /> New club
              </button>
            }
          >
            Clubs
          </SectionTitle>
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Recent clubs</h3>
              <ViewAll to="/admin/clubs" />
            </div>
            {clubs.length === 0 && <p className="text-sm text-gray-400 py-4">No clubs yet.</p>}
            <ul>
              {clubs.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => navigate(`/admin/clubs/${c.id}`)}
                    className="w-full text-left flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 hover:bg-[#9747FF]/5 rounded-lg px-1"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">
                        {`${c.owner.firstName ?? ""} ${c.owner.lastName ?? ""}`.trim() || c.owner.username} · {c.memberCount} members
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-gray-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Players ── */}
        <section className="space-y-4">
          <SectionTitle>Players</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {playerStats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Daily New Sign-ups</h3>
                <span className="text-xs bg-[#9747FF]/10 text-[#9747FF] px-3 py-1 rounded-full font-medium">This Week</span>
              </div>
              <BarChart data={dailySignups} />
              <p className="text-xs text-gray-400">
                Total this week:{" "}
                <span className="text-gray-800 font-semibold">{fmt(dailySignups.reduce((a, b) => a + b.value, 0))}</span>
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Recent Sign-ups</h3>
              <ul className="space-y-1">
                {users.map((u) => (
                  <li key={u.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.username} size={32} src={u.avatar} userId={u.id} />
                      <div>
                        <p className="text-sm font-medium text-gray-800">@{u.username}</p>
                        <p className="text-xs text-gray-400">Joined {getreadabledate(u.createdAt ?? "")}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">N/A</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;