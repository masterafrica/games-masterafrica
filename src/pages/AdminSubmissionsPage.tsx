// import {
//     GetSocialPost,
//   GetSocialPostsState,
//   useGetSocialPostSubmissions,
// } from "@/lib/graphql";
// import { getreadabledate } from "@/utils";
// import {
//   Monitor,
//   Palette,
//   Wrench,
//   Users,
//   ExternalLink,
//   X,
//   ChevronDown,
//   FileText,
//   Calendar,
//   Tag,
// } from "lucide-react";
// import { useCallback, useEffect, useRef, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";

// const CATEGORIES = [
//   { icon: Monitor, title: "Tech Skills", color: "#9747FF" },
//   { icon: Palette, title: "Creative Skills", color: "#F43F5E" },
//   { icon: Wrench, title: "Manual Skills", color: "#F59E0B" },
//   { icon: Users, title: "Soft Skills", color: "#06B6D4" },
// ];

// const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
//   "Tech Skills":     { bg: "#F3EDFF", text: "#6B21C8", border: "#C4A8F0" },
//   "Creative Skills": { bg: "#FEE7EC", text: "#BE1239", border: "#F7A8B8" },
//   "Manual Skills":   { bg: "#FEF3CD", text: "#92590A", border: "#F9D78A" },
//   "Soft Skills":     { bg: "#E0F7FA", text: "#0E6E7A", border: "#89DCE4" },
// };

// // type Submission = {
// //   user: { lastName: string; firstName: string; email: string; id?: string; username?: string };
// //   category?: string;
// //   title: string;
// //   url: string;
// //   description?: string;
// //   createdAt: string;
// //   updatedAt: string;
// // };



// const Avatar = ({ name, size = 36 }: { name: string; size?: number }) => {
//   const initials = name
//     .split(" ")
//     .map((p) => p[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);
//   return (
//     <div
//       style={{
//         width: size,
//         height: size,
//         borderRadius: "50%",
//         background: "#F3EDFF",
//         color: "#6B21C8",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontWeight: 600,
//         fontSize: size * 0.38,
//         flexShrink: 0,
//       }}
//     >
//       {initials}
//     </div>
//   );
// };

// const CategoryBadge = ({ category }: { category?: string }) => {
//   if (!category) return null;
//   const c = CATEGORY_COLORS[category] ?? { bg: "#F1F5F9", text: "#475569", border: "#CBD5E1" };
//   return (
//     <span
//       style={{
//         background: c.bg,
//         color: c.text,
//         border: `1px solid ${c.border}`,
//         borderRadius: 99,
//         padding: "2px 10px",
//         fontSize: 11,
//         fontWeight: 600,
//         whiteSpace: "nowrap",
//       }}
//     >
//       {category}
//     </span>
//   );
// };

// const UserModal = ({
//   user,
//   submissions,
//   onClose,
// }: {
//   user: GetSocialPost["user"] | null;
//   submissions: GetSocialPost[];
//   onClose: () => void;
// }) => {
//   if (!user) return null;
//   const fullName = `${user.firstName} ${user.lastName}`;
//   const userPosts = submissions.filter(
//     (s) => s.user.email === user.email
//   );

//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(0,0,0,0.45)",
//         zIndex: 50,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 16,
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           background: "#fff",
//           borderRadius: 20,
//           width: "100%",
//           maxWidth: 520,
//           maxHeight: "80vh",
//           overflowY: "auto",
//           boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
//         }}
//       >
//         {/* Modal header */}
//         <div
//           style={{
//             padding: "20px 24px 16px",
//             borderBottom: "1px solid #F1F5F9",
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//           }}
//         >
//           <Avatar name={fullName} size={44} />
//           <div style={{ flex: 1 }}>
//             <p style={{ fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>
//               {fullName}
//             </p>
//             <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>{user.email}</p>
//           </div>
//           <button
//             onClick={onClose}
//             style={{
//               background: "#F8FAFC",
//               border: "1px solid #E2E8F0",
//               borderRadius: 8,
//               width: 32,
//               height: 32,
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#64748B",
//             }}
//           >
//             <X size={16} />
//           </button>
//         </div>

//         {/* Submissions list */}
//         <div style={{ padding: "12px 24px 24px" }}>
//           <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 12, fontWeight: 600 }}>
//             {userPosts.length} submission{userPosts.length !== 1 ? "s" : ""}
//           </p>
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             {userPosts.length === 0 ? (
//               <p style={{ color: "#94A3B8", fontSize: 14, textAlign: "center", padding: "24px 0" }}>
//                 No submissions visible in the current filter.
//               </p>
//             ) : (
//               userPosts.map((s, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     background: "#F8FAFC",
//                     border: "1px solid #E2E8F0",
//                     borderRadius: 12,
//                     padding: "12px 14px",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <p style={{ fontWeight: 600, fontSize: 14, color: "#0F172A", margin: 0, marginBottom: 4 }}>
//                         {s.title}
//                       </p>
//                       {s.description && (
//                         <p style={{ fontSize: 12, color: "#64748B", margin: 0, marginBottom: 6 }}>
//                           {s.description}
//                         </p>
//                       )}
//                       <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
//                         <CategoryBadge category={s.category} />
//                         <span style={{ fontSize: 11, color: "#94A3B8" }}>
//                           {getreadabledate(s.createdAt)}
//                         </span>
//                       </div>
//                     </div>
//                     <a
//                       href={s.url}
//                       target="_blank"
//                       rel="noreferrer"
//                       style={{
//                         color: "#9747FF",
//                         flexShrink: 0,
//                         marginTop: 2,
//                       }}
//                     >
//                       <ExternalLink size={15} />
//                     </a>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AdminSubmissionsPage = () => {
//   const [getSubmissions, { loading }] = useGetSocialPostSubmissions();

//   const [submissions, setSubmissions] = useState<GetSocialPostsState>({
//     nextPage: 1,
//     hasMore: true,
//     data: [],
//   });

//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedDay, setSelectedDay] = useState<string>("");
//   const [categoryOpen, setCategoryOpen] = useState(false);

//   const [modalUser, setModalUser] = useState<GetSocialPost["user"] | null>(null);

//   const fetchSubmissions = useCallback(
//     async ({ nextPage = 1, reset = false }: { nextPage?: number; reset?: boolean }) => {
//       const input: Record<string, unknown> = { page:nextPage };
//       if (selectedCategory) input.category = selectedCategory;
//       if (selectedDay) input.createdAt = selectedDay;

//       try {
//         const res = await getSubmissions({ variables: { input } });
//         const d = res?.data?.GetSubmissions;
//         if (d) {
//           setSubmissions((prev) => ({
//             ...prev??{},
//             ...d??{},
//             data: reset ? d.data : [...(prev.data ?? []), ...(d.data ?? [])],
//           }));

          
//         }
//       } catch (_) {}
//     },
//     [getSubmissions, selectedCategory, selectedDay]
//   );

//   // Re-fetch on filter change
//   useEffect(() => {
//     setSubmissions({ nextPage: 1, hasMore: true, data: [] });
//     fetchSubmissions({ nextPage: 1, reset: true });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedCategory, selectedDay]);

//   const loadMore = () => {
//     if (!loading) fetchSubmissions({ nextPage: submissions.nextPage });
//   };

//   return (
//     <div className="container mx-auto overflow-hidden">
//       {/* Header */}
//       <div className="relative mb-10 p-6 px-3 py-12">
//         <div className="w-full opacity-50 md:opacity-100 absolute left-[-25%] md:left-[10%] flex justify-space-between pointer-events-none">
//           <img alt="" src="/images/asset-1.png" width={120} />
//         </div>
//         <div className="absolute opacity-50 md:opacity-100 md:right-[10%] right-[-25%] top-[40%] pointer-events-none">
//           <img alt="" src="/images/asset-2.png" width={120} />
//         </div>

//         <div className="flex justify-center items-center gap-2 mb-6 text-secondary">
//           <FileText size={18} />
//           <p>Challenge Submissions</p>
//         </div>

//         <div className="max-w-lg mx-auto text-center">
//           <h1 className="text-5xl font-bold text-primary">SUBMISSIONS</h1>
//           <p className="opacity-80">Browse all social post challenge entries from players.</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="max-w-5xl px-4 mx-auto mb-6 flex flex-wrap gap-3 items-center">
//         {/* Day picker */}
//         <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
//           <Calendar size={15} className="text-gray-400" />
//           <input
//             type="date"
//             value={selectedDay}
//             onChange={(e) => setSelectedDay(e.target.value)}
//             className="text-sm text-gray-700 outline-none bg-transparent"
//           />
//           {selectedDay && (
//             <button
//               onClick={() => setSelectedDay("")}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <X size={14} />
//             </button>
//           )}
//         </div>

//         {/* Category picker */}
//         <div className="relative">
//           <button
//             onClick={() => setCategoryOpen((o) => !o)}
//             className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <Tag size={15} className="text-gray-400" />
//             {selectedCategory || "All categories"}
//             <ChevronDown size={14} className="text-gray-400" />
//           </button>
//           {categoryOpen && (
//             <div className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 w-52 py-1 overflow-hidden">
//               <button
//                 onClick={() => { setSelectedCategory(""); setCategoryOpen(false); }}
//                 className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
//               >
//                 All categories
//               </button>
//               {CATEGORIES.map((c) => {
//                 const Icon = c.icon;
//                 return (
//                   <button
//                     key={c.title}
//                     onClick={() => { setSelectedCategory(c.title); setCategoryOpen(false); }}
//                     className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
//                   >
//                     <Icon size={14} style={{ color: c.color }} />
//                     {c.title}
//                   </button>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Active filter chips */}
//         {selectedCategory && (
//           <div
//             className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
//             style={CATEGORY_COLORS[selectedCategory]
//               ? { background: CATEGORY_COLORS[selectedCategory].bg, color: CATEGORY_COLORS[selectedCategory].text }
//               : { background: "#F1F5F9", color: "#475569" }}
//           >
//             {selectedCategory}
//             <button onClick={() => setSelectedCategory("")}>
//               <X size={12} />
//             </button>
//           </div>
//         )}
//         {selectedDay && (
//           <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700">
//             {new Date(selectedDay).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
//             <button onClick={() => setSelectedDay("")}>
//               <X size={12} />
//             </button>
//           </div>
//         )}

//         <span className="ml-auto text-sm text-gray-400">
//           {submissions.data.length} loaded
//         </span>
//       </div>

//       {/* Infinite scroll list */}
//       <div className="max-w-5xl px-4 mx-auto pb-12">
//         <InfiniteScroll
//           dataLength={submissions.data.length}
//           next={loadMore}
//           hasMore={submissions.hasMore}
//           loader={
//             <div className="flex justify-center py-6">
//               <div className="w-6 h-6 rounded-full border-2 border-[#9747FF] border-t-transparent animate-spin" />
//             </div>
//           }
//           endMessage={
//             <p className="text-center text-sm text-gray-400 py-8">
//               {submissions.data.length === 0
//                 ? "No submissions found."
//                 : "All submissions loaded."}
//             </p>
//           }
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {submissions.data.map((s, i) => {
//               const fullName = `${s.user.firstName} ${s.user.lastName}`;
//               return (
//                 <div
//                   key={i}
//                   className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
//                 >
//                   {/* Card top */}
//                   <div className="p-5 flex-1 flex flex-col gap-3">
//                     <div className="flex items-start justify-between gap-2">
//                       <CategoryBadge category={s.category} />
//                       <span className="text-[11px] text-gray-400 whitespace-nowrap mt-0.5">
//                         {getreadabledate(s.createdAt)}
//                       </span>
//                     </div>

//                     <div>
//                       <p className="font-semibold text-gray-900 text-[15px] leading-snug mb-1">
//                         {s.title}
//                       </p>
//                       {s.description && (
//                         <p className="text-xs text-gray-500 line-clamp-2">{s.description}</p>
//                       )}
//                     </div>

//                     <a
//                       href={s.url}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="inline-flex items-center gap-1 text-xs text-[#9747FF] font-medium hover:underline mt-auto"
//                     >
//                       View post <ExternalLink size={12} />
//                     </a>
//                   </div>

//                   {/* Card footer — user */}
//                   <button
//                     onClick={() => setModalUser(s.user)}
//                     className="flex items-center gap-3 px-5 py-3 border-t border-gray-50 hover:bg-[#9747FF]/5 transition-colors text-left w-full"
//                   >
//                     <Avatar name={fullName} size={30} />
//                     <div className="min-w-0">
//                       <p className="text-sm font-medium text-gray-800 truncate">{fullName}</p>
//                       <p className="text-[11px] text-gray-400 truncate">{s.user.email}</p>
//                     </div>
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </InfiniteScroll>
//       </div>

//       {/* User modal */}
//       <UserModal
//         user={modalUser}
//         submissions={submissions.data}
//         onClose={() => setModalUser(null)}
//       />
//     </div>
//   );
// };

// export default AdminSubmissionsPage;



import {
  GetSocialPost,
  GetSocialPostsState,
  useGetSocialPostSubmissions,
} from "@/lib/graphql";
import { getreadabledate } from "@/utils";
import {
  Monitor,
  Palette,
  Wrench,
  Users,
  ExternalLink,
  X,
  ChevronDown,
  FileText,
  Calendar,
  Tag,
  Search,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const CATEGORIES = [
  { icon: Monitor, title: "Tech Skills", color: "#9747FF" },
  { icon: Palette, title: "Creative Skills", color: "#F43F5E" },
  { icon: Wrench, title: "Manual Skills", color: "#F59E0B" },
  { icon: Users, title: "Soft Skills", color: "#06B6D4" },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Tech Skills":     { bg: "#F3EDFF", text: "#6B21C8", border: "#C4A8F0" },
  "Creative Skills": { bg: "#FEE7EC", text: "#BE1239", border: "#F7A8B8" },
  "Manual Skills":   { bg: "#FEF3CD", text: "#92590A", border: "#F9D78A" },
  "Soft Skills":     { bg: "#E0F7FA", text: "#0E6E7A", border: "#89DCE4" },
};

const EMPTY_STATE: GetSocialPostsState = { nextPage: 1, hasMore: true, data: [] };

// ─── shared sub-components ────────────────────────────────────────────────────

const Avatar = ({ name, size = 36 }: { name: string; size?: number }) => {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#F3EDFF",
        color: "#6B21C8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: size * 0.38,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
};

const CategoryBadge = ({ category }: { category?: string }) => {
  if (!category) return null;
  const c = CATEGORY_COLORS[category] ?? { bg: "#F1F5F9", text: "#475569", border: "#CBD5E1" };
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        borderRadius: 99,
        padding: "2px 10px",
        fontSize: 11,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {category}
    </span>
  );
};

const Spinner = () => (
  <div className="flex justify-center py-6">
    <div className="w-6 h-6 rounded-full border-2 border-[#9747FF] border-t-transparent animate-spin" />
  </div>
);

// ─── UserModal — has its own fetch + infinite scroll ──────────────────────────

const UserModal = ({
  user,
  onClose,
}: {
  user: GetSocialPost["user"] | null;
  onClose: () => void;
}) => {
  const [getSubmissions, { loading }] = useGetSocialPostSubmissions();
  const [state, setState] = useState<GetSocialPostsState>(EMPTY_STATE);
  const modalRef = useRef<HTMLDivElement>(null);

  const fullName = user ? `${user.firstName} ${user.lastName}` : "";

  const fetchPage = useCallback(
    async ({ nextPage = 1, reset = false }: { nextPage?: number; reset?: boolean }) => {
      if (!user?.id) return;
      try {
        const res = await getSubmissions({ variables: { input: { page: nextPage, user: user.id } } });
        const d = res?.data?.GetSubmissions;
        if (d) {
          setState((prev) => ({
            ...prev,
            ...d,
            data: reset ? d.data : [...(prev.data ?? []), ...(d.data ?? [])],
          }));
        }
      } catch (_) {}
    },
    [getSubmissions, user?.id]
  );

  // fetch first page whenever user changes
  useEffect(() => {
    if (!user) return;
    setState(EMPTY_STATE);
    fetchPage({ nextPage: 1, reset: true });
    // scroll modal back to top
    if (modalRef.current) modalRef.current.scrollTop = 0;
  }, [user?.id]);

  if (!user) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        ref={modalRef}
        id="modal-scroll-target"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 520,
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "#fff",
            zIndex: 1,
            padding: "20px 24px 16px",
            borderBottom: "1px solid #F1F5F9",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Avatar name={fullName} size={44} />
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>{fullName}</p>
            <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>{user.email}</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: 8,
              width: 32,
              height: 32,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748B",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* infinite-scroll body */}
        <div style={{ padding: "12px 24px 24px" }}>
          <InfiniteScroll
            dataLength={state.data.length}
            next={() => { if (!loading) fetchPage({ nextPage: state.nextPage }); }}
            hasMore={state.hasMore}
            loader={<Spinner />}
            scrollableTarget="modal-scroll-target"
            endMessage={
              <p style={{ textAlign: "center", fontSize: 13, color: "#94A3B8", padding: "16px 0" }}>
                {state.data.length === 0 && !loading
                  ? "No submissions found."
                  : state.data.length > 0
                  ? "All submissions loaded."
                  : null}
              </p>
            }
          >
            <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 12, fontWeight: 600 }}>
              {state.data.length} submission{state.data.length !== 1 ? "s" : ""} loaded
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {state.data.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: 12,
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: 14, color: "#0F172A", margin: 0, marginBottom: 4 }}>
                        {s.title}
                      </p>
                      {s.description && (
                        <p style={{ fontSize: 12, color: "#64748B", margin: 0, marginBottom: 6 }}>
                          {s.description}
                        </p>
                      )}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <CategoryBadge category={s.category} />
                        <span style={{ fontSize: 11, color: "#94A3B8" }}>
                          {getreadabledate(s.createdAt)}
                        </span>
                      </div>
                    </div>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#9747FF", flexShrink: 0, marginTop: 2 }}
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const AdminSubmissionsPage = () => {
  const [getSubmissions, { loading }] = useGetSocialPostSubmissions();

  const [submissions, setSubmissions] = useState<GetSocialPostsState>(EMPTY_STATE);

  // filters
  const [query, setQuery]               = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDay, setSelectedDay]   = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);

  // modal
  const [modalUser, setModalUser] = useState<GetSocialPost["user"] | null>(null);

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  const fetchSubmissions = useCallback(
    async ({ nextPage = 1, reset = false }: { nextPage?: number; reset?: boolean }) => {
      const input: Record<string, unknown> = { page: nextPage };
      if (debouncedQuery)   input.query    = debouncedQuery;
      if (selectedCategory) input.category = selectedCategory;
      if (selectedDay)      input.createdAt = selectedDay;

      try {
        const res = await getSubmissions({ variables: { input } });
        const d = res?.data?.GetSubmissions;
        if (d) {
          setSubmissions((prev) => ({
            ...prev,
            ...d,
            data: reset ? d.data : [...(prev.data ?? []), ...(d.data ?? [])],
          }));
        }
      } catch (_) {}
    },
    [getSubmissions, debouncedQuery, selectedCategory, selectedDay]
  );

  // re-fetch on any filter change
  useEffect(() => {
    setSubmissions(EMPTY_STATE);
    fetchSubmissions({ nextPage: 1, reset: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, selectedCategory, selectedDay]);

  const loadMore = () => {
    if (!loading) fetchSubmissions({ nextPage: submissions.nextPage });
  };

  const activeFilterCount = [debouncedQuery, selectedCategory, selectedDay].filter(Boolean).length;

  return (
    <div className="container mx-auto overflow-hidden">
      {/* Header */}
      <div className="relative mb-10 p-6 px-3 py-12">
        <div className="w-full opacity-50 md:opacity-100 absolute left-[-25%] md:left-[10%] flex justify-space-between pointer-events-none">
          <img alt="" src="/images/asset-1.png" width={120} />
        </div>
        <div className="absolute opacity-50 md:opacity-100 md:right-[10%] right-[-25%] top-[40%] pointer-events-none">
          <img alt="" src="/images/asset-2.png" width={120} />
        </div>

        <div className="flex justify-center items-center gap-2 mb-6 text-secondary">
          <FileText size={18} />
          <p>Challenge Submissions</p>
        </div>

        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary">SUBMISSIONS</h1>
          <p className="opacity-80">Browse all social post challenge entries from players.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-5xl px-4 mx-auto mb-6 space-y-3">
        {/* row 1: search bar */}
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by title, description…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>

        {/* row 2: day + category pickers + count */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Day picker */}
          <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
            <Calendar size={15} className="text-gray-400" />
            <input
              type="date"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="text-sm text-gray-700 outline-none bg-transparent"
            />
            {selectedDay && (
              <button onClick={() => setSelectedDay("")} className="text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category picker */}
          <div className="relative">
            <button
              onClick={() => setCategoryOpen((o) => !o)}
              className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Tag size={15} className="text-gray-400" />
              {selectedCategory || "All categories"}
              <ChevronDown size={14} className="text-gray-400" />
            </button>
            {categoryOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 w-52 py-1 overflow-hidden">
                <button
                  onClick={() => { setSelectedCategory(""); setCategoryOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  All categories
                </button>
                {CATEGORIES.map((c) => {
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.title}
                      onClick={() => { setSelectedCategory(c.title); setCategoryOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Icon size={14} style={{ color: c.color }} />
                      {c.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* active chips */}
          {selectedCategory && (
            <div
              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
              style={
                CATEGORY_COLORS[selectedCategory]
                  ? { background: CATEGORY_COLORS[selectedCategory].bg, color: CATEGORY_COLORS[selectedCategory].text }
                  : { background: "#F1F5F9", color: "#475569" }
              }
            >
              {selectedCategory}
              <button onClick={() => setSelectedCategory("")}><X size={12} /></button>
            </div>
          )}
          {selectedDay && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700">
              {new Date(selectedDay).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              <button onClick={() => setSelectedDay("")}><X size={12} /></button>
            </div>
          )}
          {debouncedQuery && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700">
              "{debouncedQuery}"
              <button onClick={() => setQuery("")}><X size={12} /></button>
            </div>
          )}

          {activeFilterCount > 0 && (
            <button
              onClick={() => { setQuery(""); setSelectedCategory(""); setSelectedDay(""); }}
              className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2"
            >
              Clear all
            </button>
          )}

          <span className="ml-auto text-sm text-gray-400">{submissions.data.length} loaded</span>
        </div>
      </div>

      {/* Infinite scroll list */}
      <div className="max-w-5xl px-4 mx-auto pb-12">
        <InfiniteScroll
          dataLength={submissions.data.length}
          next={loadMore}
          hasMore={submissions.hasMore}
          loader={<Spinner />}
          endMessage={
            <p className="text-center text-sm text-gray-400 py-8">
              {submissions.data.length === 0 && !loading
                ? "No submissions found."
                : submissions.data.length > 0
                ? "All submissions loaded."
                : null}
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {submissions.data.map((s, i) => {
              const fullName = `${s.user.firstName} ${s.user.lastName}`;
              return (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
                >
                  <div className="p-5 flex-1 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <CategoryBadge category={s.category} />
                      <span className="text-[11px] text-gray-400 whitespace-nowrap mt-0.5">
                        {getreadabledate(s.createdAt)}
                      </span>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 text-[15px] leading-snug mb-1">{s.title}</p>
                      {s.description && (
                        <p className="text-xs text-gray-500 line-clamp-2">{s.description}</p>
                      )}
                    </div>

                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#9747FF] font-medium hover:underline mt-auto"
                    >
                      View post <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* user footer — clicking opens modal with its own fetch */}
                  <button
                    onClick={() => setModalUser(s.user)}
                    className="flex items-center gap-3 px-5 py-3 border-t border-gray-50 hover:bg-[#9747FF]/5 transition-colors text-left w-full"
                  >
                    <Avatar name={fullName} size={30} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{fullName}</p>
                      <p className="text-[11px] text-gray-400 truncate">{s.user.email}</p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>

      <UserModal user={modalUser} onClose={() => setModalUser(null)} />
    </div>
  );
};

export default AdminSubmissionsPage;