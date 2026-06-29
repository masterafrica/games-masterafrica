// import { SignupGraphPoint, useGetLoginStats, useGetRecentSignUpUsers, useGetSignUpGraph, useGetSocialPostSubmissions, User } from "@/lib/graphql";
// import { getreadabledate } from "@/utils";
// import { Users, UserPlus, LogIn, TrendingUp, Activity } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// type Input = {
//   date: string;
//   totalSignups: number;
// };

// type Output = {
//   day: string;
//   value: number;
// }[];

// export function convertToDailySignups(data: Input[]): Output {
//   const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return data.map((item) => {
//     const date = new Date(item.date);
//     const day = dayMap[date.getDay()];

//     return {
//       day,
//       value: item.totalSignups,
//     };
//   });
// }
// const MOCK = {
//   totalUsers: 14_823,
//   newUsersToday: 142,
//   loginsToday: 1_037,
//   signinsThisWeek: 4_512,
//   dailySignups: [
//     { day: "Mon", value: 98 },
//     { day: "Tue", value: 134 },
//     { day: "Wed", value: 110 },
//     { day: "Thu", value: 189 },
//     { day: "Fri", value: 142 },
//     { day: "Sat", value: 76 },
//     { day: "Sun", value: 53 },
//   ],
//   recentUsers: [
//     { username: "chukwuemeka_j", joined: "2 mins ago", status: "online" },
//     { username: "amara_obi", joined: "11 mins ago", status: "online" },
//     { username: "tolu_adeyemi", joined: "34 mins ago", status: "offline" },
//     { username: "ngozi_eze", joined: "1 hr ago", status: "online" },
//     { username: "emeka_nwosu", joined: "2 hrs ago", status: "offline" },
//     { username: "fatima_bello", joined: "3 hrs ago", status: "online" },
//   ],
// };

// const fmt = (n: number) => n.toLocaleString();

// interface StatCardProps {
//   icon: React.ReactNode;
//   label: string;
//   value: string | number;
//   sub?: string;
//   accent: string;
//   iconColor: string;
// }

// const StatCard = ({ icon, label, value, sub, accent, iconColor :_ }: StatCardProps) => (
//   <div className="relative rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col gap-4 overflow-hidden hover:shadow-md transition-all duration-200">
//     <div className={`absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-10 ${accent}`} />
//     <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${accent}`}>
//       {icon}
//     </div>
//     <div>
//       <p className="text-3xl font-bold text-gray-900">{typeof value === "number" ? fmt(value) : value}</p>
//       <p className="text-sm text-gray-500 mt-0.5">{label}</p>
//       {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
//     </div>
//   </div>
// );

// const BarChart = ({ data }: { data: { day: string; value: number }[] }) => {
//   const max = Math.max(...data.map((d) => d.value));
//   return (
//     <div className="flex items-end gap-2 h-24">
//       {data.map((d) => (
//         <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
//           <div
//             className="w-full rounded-t-md bg-[#9747FF] opacity-70 hover:opacity-100 transition-all cursor-pointer"
//             style={{ height: `${(d.value / max) * 80}px` }}
//             title={`${d.day}: ${d.value}`}
//           />
//           <span className="text-[10px] text-gray-400">{d.day}</span>
//         </div>
//       ))}
//     </div>
//   );
// };
// const CATEGORIES = [
//   {
//     icon: Monitor,
//     title: "Tech Skills",
//     description: "Show off your tech knowledge and digital abilities.",
//     color: "#9747FF",
//     bg: "bg-violet-500/10",
//     border: "border-violet-500/30",
//   },
//   {
//     icon: Palette,
//     title: "Creative Skills",
//     description:
//       "Show your creativity through design, writing, music, art, content and more.",
//     color: "#F43F5E",
//     bg: "bg-rose-500/10",
//     border: "border-rose-500/30",
//   },
//   {
//     icon: Wrench,
//     title: "Manual Skills",
//     description:
//       "Show your hands-on skills and how you build, fix or make things.",
//     color: "#F59E0B",
//     bg: "bg-amber-500/10",
//     border: "border-amber-500/30",
//   },
//   {
//     icon: Users,
//     title: "Soft Skills",
//     description:
//       "Show your communication, leadership, teamwork, teaching and more people skills.",
//     color: "#06B6D4",
//     bg: "bg-cyan-500/10",
//     border: "border-cyan-500/30",
//   },
// ];

// const AdminUserAnalyticPage = () => {
//   const [range] = useState("This Week");
//  const [getLoginStats, { loading: _getLoginStatsLoading }] = useGetLoginStats();
//  const [getSubmissions, { loading: getSubmissionsLoadinf }] = useGetSocialPostSubmissions();
//  const [getSignUpGraph, { loading: _getSignUpGraphLoading }] = useGetSignUpGraph();
//  const [getRecentSignUpUsers, { loading: _getRecentSignUpUsersLoading }] = useGetRecentSignUpUsers();

//  const [submissions,setSubmissions] = useState<{
//   nextPage:number
//   hasMore:boolean
//   data:{
// user:{
//   lastName:string
//   firstName:string
//   email:string
  
  
// }
// category?:string
// title:string
// url:string
// description?:string
// createdAt:string
// updatedAt:string
//   }[]
//  }>({})
//  const handleGetsubmissions =async ({nextPage=1,reset=false,userId,category,dayStartDate})=>{
// let input = {
//     nextPage
//   }
//   if(userId){
//     input.user =  userId
//   }
//   if(skill){
//     input.category =  skill
//   }
//   if(dayStartDate){
//     input.createdAt =  dayStartDate
//   }
// try{
// let data = await getSubmissions({variables:{
//   input
// }})
// let d = data?.data?.GetSubmissions
// if(d){
//   setSubmissions(e=>{
//     return {...e??{},
//   ...d,data:reset?d.data:[...(e?.data??[]),...(d?.data??[])]
//   }
//   })
// }
// }catch(e){

// }

//  }

//  const onHandleGetSubmissionEndReach = ()=>{
// handleGetsubmissions({nextPage:submissions?.nextPage||1})
//  }
// const [statsData,setStatsData] = useState({
//     todayLogins: 0,
// todaySignups: 0,
// totalSignups: 0,
// weekstats: {totalSignups: 0, totalLogins: 0}

// })
// const [graphs,setGraphs] = useState<SignupGraphPoint[]>([])
// const [users,setUsers] = useState<User[]>([])
// let dailySignups =useMemo(()=>{return  convertToDailySignups(graphs)},[graphs])
//   const getStats = async () => {
//     try {
//       const result = await getLoginStats();
// console.log(result?.data)
//       if (result.data?.GetLoginStats) {

//           setStatsData(result?.data?.GetLoginStats)
//       }}catch(e){
//       }
    
//     }
//   const getUsers = async () => {
//     try {
//       const result = await getRecentSignUpUsers();
// console.log(result?.data)
//       if (result.data?.GetRecentSignups) {

//           setUsers(result?.data?.GetRecentSignups)
//       }}catch(e){
//       }
    
//     }
//   const getGraph = async () => {
//     try {
//       const result = await getSignUpGraph();
// console.log(result?.data)
//       if (result.data?.GetSignupGraph) {

//           setGraphs(result?.data?.GetSignupGraph)
//       }}catch(e){
//       }
    
//     }

//     useEffect(()=>{

// getUsers()
//         getStats()
//         getGraph()
//     },[

//     ])


//   const stats = [
//     {
//       icon: <Users size={20} />,
//       label: "Total Users",
//       value: statsData?.totalSignups??0,
//       sub: "All registered accounts",
//       accent: "bg-[#9747FF]",
//       iconColor: "#9747FF",
//     },
//     {
//       icon: <UserPlus size={20} />,
//       label: "New Users Today",
//       value: statsData?.todaySignups??0,
//       sub: `+${MOCK.newUsersToday} since midnight`,
//       accent: "bg-[#FFD06A]",
//       iconColor: "#FFD06A",
//     },
//     {
//       icon: <LogIn size={20} />,
//       label: "Logins Today",
//       value: statsData?.todayLogins??0,
//       sub: "Unique sessions today",
//       accent: "bg-emerald-500",
//       iconColor: "#10b981",
//     },
//     {
//       icon: <TrendingUp size={20} />,
//       label: "Sign-ins This Week",
//       value: statsData?.weekstats?.totalLogins??0,
//       sub: range,
//       accent: "bg-sky-500",
//       iconColor: "#0ea5e9",
//     },
//   ];

//   return (
//     <div className="container mx-auto overflow-hidden">

//       {/* Hero — mirrors DashboardPage exactly */}
//       <div className="relative mb-12 p-6 px-3 py-12">
//         <div className="w-full opacity-50 md:opacity-100 absolute left-[-25%] md:left-[10%] flex justify-space-between">
//           <img alt="" src="/images/asset-1.png" width={120} />
//         </div>
//         <div className="absolute opacity-50 md:opacity-100 md:right-[10%] right-[-25%] top-[40%]">
//           <img alt="" src="/images/asset-2.png" width={120} />
//         </div>

//         <div className="flex justify-center items-center gap-2 mb-6 text-secondary">
//           <Activity size={18} />
//           <p>Live Analytics Dashboard</p>
//         </div>

//         <div className="max-w-lg mx-auto text-center">
//           <h1 className="text-5xl font-bold text-primary">USER INSIGHTS</h1>
//           <p className="opacity-80">
//             Real-time overview of player activity across MAG World.
//           </p>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-6xl px-4 mx-auto space-y-6">

//         {/* Stat cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//           {stats.map((s) => (
//             <StatCard key={s.label} {...s} />
//           ))}
//         </div>

//         {/* Chart + recent users */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-4">
//             <div className="flex items-center justify-between">
//               <h2 className="font-semibold text-gray-800">Daily New Sign-ups</h2>
//               <span className="text-xs bg-[#9747FF]/10 text-[#9747FF] px-3 py-1 rounded-full font-medium">
//                 This Week
//               </span>
//             </div>
//             <BarChart data={dailySignups} />
//             <p className="text-xs text-gray-400">
//               Total this week:{" "}
//               <span className="text-gray-800 font-semibold">
//                 {fmt(dailySignups.reduce((a, b) => a + b.value, 0))}
//               </span>
//             </p>
//           </div>

//           <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-4">
//             <h2 className="font-semibold text-gray-800">Recent Sign-ups</h2>
//             <ul className="space-y-1">
//               {users.map((u) => (
//                 <li
//                   key={u.id}
//                   className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-[#9747FF]/10 flex items-center justify-center text-xs font-bold text-[#9747FF]">
//                       {u.username[0].toUpperCase()}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-800">@{u.username}</p>
//                       <p className="text-xs text-gray-400">Joined {getreadabledate(u.createdAt??"")}</p>
//                     </div>
//                   </div>
//                   <span
//                     className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
//                      "online" === "online"
//                         ? "bg-emerald-50 text-emerald-500"
//                         : "bg-gray-100 text-gray-400"
//                     }`}
//                   >
//                     {"N|A"}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Weekly growth strip */}
//         <div className="rounded-2xl hidden border border-[#9747FF]/20 bg-[#9747FF]/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div>
//             <p className="font-bold text-gray-800 text-lg">Weekly Growth Rate</p>
//             <p className="text-gray-400 text-sm">Based on sign-ins vs. previous week</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-4xl font-extrabold text-[#9747FF]">+18.4%</span>
//             <TrendingUp size={28} className="text-[#FFD06A]" />
//           </div>
//         </div>

//         <div className="h-[20px]" />
//       </div>
//     </div>
//   );
// };

// export default AdminUserAnalyticPage;




import { SignupGraphPoint, useGetLoginStats, useGetRecentSignUpUsers, useGetSignUpGraph, User } from "@/lib/graphql";
import { getreadabledate } from "@/utils";
import { Users, UserPlus, LogIn, TrendingUp, Activity, FileText, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom"; // adjust to your router

type Input = {
  date: string;
  totalSignups: number;
};

type Output = {
  day: string;
  value: number;
}[];

export function convertToDailySignups(data: Input[]): Output {
  const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return data.map((item) => {
    const date = new Date(item.date);
    return { day: dayMap[date.getDay()], value: item.totalSignups };
  });
}

const fmt = (n: number) => n.toLocaleString();

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
}

const StatCard = ({ icon, label, value, sub, accent }: StatCardProps) => (
  <div className="relative rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col gap-4 overflow-hidden hover:shadow-md transition-all duration-200">
    <div className={`absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-10 ${accent}`} />
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${accent}`}>
      {icon}
    </div>
    <div>
      <p className="text-3xl font-bold text-gray-900">{typeof value === "number" ? fmt(value) : value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  </div>
);

const BarChart = ({ data }: { data: { day: string; value: number }[] }) => {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2 h-24">
      {data.map((d) => (
        <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
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

const AdminUserAnalyticPage = () => {
  const [range] = useState("This Week");

  const [getLoginStats] = useGetLoginStats();
  const [getSignUpGraph] = useGetSignUpGraph();
  const [getRecentSignUpUsers] = useGetRecentSignUpUsers();

  const [statsData, setStatsData] = useState({
    todayLogins: 0,
    todaySignups: 0,
    totalSignups: 0,
    weekstats: { totalSignups: 0, totalLogins: 0 },
  });
  const [graphs, setGraphs] = useState<SignupGraphPoint[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const dailySignups = useMemo(() => convertToDailySignups(graphs), [graphs]);

  const getStats = async () => {
    try {
      const result = await getLoginStats();
      if (result.data?.GetLoginStats) setStatsData(result.data.GetLoginStats);
    } catch (_) {}
  };

  const getUsers = async () => {
    try {
      const result = await getRecentSignUpUsers();
      if (result.data?.GetRecentSignups) setUsers(result.data.GetRecentSignups);
    } catch (_) {}
  };

  const getGraph = async () => {
    try {
      const result = await getSignUpGraph();
      if (result.data?.GetSignupGraph) setGraphs(result.data.GetSignupGraph);
    } catch (_) {}
  };

  useEffect(() => {
    getStats();
    getGraph();
    getUsers();
  }, []);

  const stats = [
    {
      icon: <Users size={20} />,
      label: "Total Users",
      value: statsData?.totalSignups ?? 0,
      sub: "All registered accounts",
      accent: "bg-[#9747FF]",
    },
    {
      icon: <UserPlus size={20} />,
      label: "New Users Today",
      value: statsData?.todaySignups ?? 0,
      sub: "Since midnight",
      accent: "bg-[#FFD06A]",
    },
    {
      icon: <LogIn size={20} />,
      label: "Logins Today",
      value: statsData?.todayLogins ?? 0,
      sub: "Unique sessions today",
      accent: "bg-emerald-500",
    },
    {
      icon: <TrendingUp size={20} />,
      label: "Sign-ins This Week",
      value: statsData?.weekstats?.totalLogins ?? 0,
      sub: range,
      accent: "bg-sky-500",
    },
  ];

  return (
    <div className="container mx-auto overflow-hidden">
      {/* Hero */}
      <div className="relative mb-12 p-6 px-3 py-12">
        <div className="w-full opacity-50 md:opacity-100 absolute left-[-25%] md:left-[10%] flex justify-space-between">
          <img alt="" src="/images/asset-1.png" width={120} />
        </div>
        <div className="absolute opacity-50 md:opacity-100 md:right-[10%] right-[-25%] top-[40%]">
          <img alt="" src="/images/asset-2.png" width={120} />
        </div>

        <div className="flex justify-center items-center gap-2 mb-6 text-secondary">
          <Activity size={18} />
          <p>Live Analytics Dashboard</p>
        </div>

        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary">USER INSIGHTS</h1>
          <p className="opacity-80">Real-time overview of player activity across MAG World.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl px-4 mx-auto space-y-6">

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Chart + recent users */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Daily New Sign-ups</h2>
              <span className="text-xs bg-[#9747FF]/10 text-[#9747FF] px-3 py-1 rounded-full font-medium">
                This Week
              </span>
            </div>
            <BarChart data={dailySignups} />
            <p className="text-xs text-gray-400">
              Total this week:{" "}
              <span className="text-gray-800 font-semibold">
                {fmt(dailySignups.reduce((a, b) => a + b.value, 0))}
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-4">
            <h2 className="font-semibold text-gray-800">Recent Sign-ups</h2>
            <ul className="space-y-1">
              {users.map((u) => (
                <li
                  key={u.id}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#9747FF]/10 flex items-center justify-center text-xs font-bold text-[#9747FF]">
                      {u.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">@{u.username}</p>
                      <p className="text-xs text-gray-400">Joined {getreadabledate(u.createdAt ?? "")}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
                    N/A
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Submissions CTA */}
        <Link
          to="/social-post-submissions" // ← adjust to your actual route
          className="group flex items-center justify-between rounded-2xl border border-[#9747FF]/20 bg-[#9747FF]/5 p-6 hover:bg-[#9747FF]/10 transition-colors duration-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#9747FF] flex items-center justify-center text-white flex-shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg">Challenge Submissions</p>
              <p className="text-gray-400 text-sm">
                Browse, filter, and review all social post challenge entries.
              </p>
            </div>
          </div>
          <ArrowRight
            size={22}
            className="text-[#9747FF] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
          />
        </Link>

        <div className="h-[20px]" />
      </div>
    </div>
  );
};

export default AdminUserAnalyticPage;