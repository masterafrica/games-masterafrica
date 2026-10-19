// // // userside

// // import { useState } from "react";
// // import { Button } from "@heroui/button";
// // import { Card, CardBody } from "@heroui/card";
// // import { Input } from "@heroui/input";
// // import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// // import {
// //   ArrowLeft,
// //   Trophy,
// //   Monitor,
// //   Palette,
// //   Wrench,
// //   Users,
// //   Upload,
// //   UserCheck,
// //   CalendarDays,
// //   Share2,
// //   ArrowRight,
// //   Link as LinkIcon,
// //   Wallet,
// // } from "lucide-react";
// // import { useSubmitSocialPost } from "@/lib/graphql";
// // import { BankDetails } from "@/components/modules/bank-details";

// // const CATEGORIES = [
// //   {
// //     icon: Monitor,
// //     title: "Tech Skills",
// //     description: "Show off your tech knowledge and digital abilities.",
// //     color: "#9747FF",
// //     bg: "bg-violet-500/10",
// //     border: "border-violet-500/30",
// //   },
// //   {
// //     icon: Palette,
// //     title: "Creative Skills",
// //     description:
// //       "Show your creativity through design, writing, music, art, content and more.",
// //     color: "#F43F5E",
// //     bg: "bg-rose-500/10",
// //     border: "border-rose-500/30",
// //   },
// //   {
// //     icon: Wrench,
// //     title: "Manual Skills",
// //     description:
// //       "Show your hands-on skills and how you build, fix or make things.",
// //     color: "#F59E0B",
// //     bg: "bg-amber-500/10",
// //     border: "border-amber-500/30",
// //   },
// //   {
// //     icon: Users,
// //     title: "Soft Skills",
// //     description:
// //       "Show your communication, leadership, teamwork, teaching and more people skills.",
// //     color: "#06B6D4",
// //     bg: "bg-cyan-500/10",
// //     border: "border-cyan-500/30",
// //   },
// // ];

// // const STEPS = [
// //   {
// //     step: 1,
// //     icon: UserCheck,
// //     title: "Open your MAG account",
// //     description: "Sign up at games.masterafrica.com",
// //   },
// //   {
// //     step: 2,
// //     icon: Upload,
// //     title: "Submit your entry",
// //     description:
// //       "Record a 30–90 second video or take a photo showcasing your skill, then paste the link below.",
// //   },
// //   {
// //     step: 3,
// //     icon: Wallet,
// //     title: "Entry Fee Access",
// //     description:
// //       "Submission is free, but players must pay ₦500 to qualify for voting/judging and the ₦10,000 prize.",
// //     bank: true,
// //   },
// // ];

// // const KEY_INFO = [
// //   { icon: CalendarDays, text: "New challenge every week" },
// //   { icon: Users, text: "Top 5 entries qualify for voting" },
// //   { icon: Trophy, text: "Winner determined by highest votes" },
// //   { icon: Share2, text: "Share. Get votes. Win!" },
// // ];

// // const MagChallengePage = () => {
// //   const navigate = useNavigate();

// //   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
// //   const [title, setTitle] = useState("");
// //   const [link, setLink] = useState("");
// //   const [description, setDescription] = useState("");
// //   // const [submitting, setSubmitting] = useState(false);


// //     const { submitPost, loading: submitting,   error: _, } = useSubmitSocialPost();

// //   const handleSubmit = async () => {
// //     if (!selectedCategory) {
// //       toast.error("Please select a category.");
// //       return;
// //     }
// //     if (!title.trim()) {
// //       toast.error("Please enter a title for your entry.");
// //       return;
// //     }
// //     if (!link.trim()) {
// //       toast.error("Please paste a link to your video or photo.");
// //       return;
// //     }

// //     // setSubmitting(true);
// //     try {
// //       // TODO: wire up to backend API



// //       await submitPost({
// //         url:link,
// //         title,
// //         description,
// //         category:selectedCategory

// //       })
// //       // await new Promise((r) => setTimeout(r, 1500));
// //       toast.success("Entry submitted! Good luck!");
// //       setSelectedCategory(null);
// //       setTitle("");
// //       setLink("");
// //       setDescription("");
// //     } catch {
// //       toast.error("Something went wrong. Please try again.");
// //     } finally {
// //       // setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-white dark:bg-gray-950">
// //       {/* Header */}
// //       <div className="container mx-auto px-4 py-6">
// //         <button
// //           className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mb-6"
// //           onClick={() => navigate(-1)}
// //         >
// //           <ArrowLeft className="w-4 h-4" />
// //           Back
// //         </button>

// //         <div className="text-center max-w-2xl mx-auto mb-10">
// //           <div className="flex justify-center mb-4">
// //             <span className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full">
// //               <Trophy className="w-4 h-4" />
// //               This Week&apos;s Challenge
// //             </span>
// //           </div>
// //           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
// //             MAG <span className="text-primary">Challenge</span>
// //           </h1>
// //           <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
// //             Show Us What You&apos;ve Got!
// //           </p>
// //           <p className="text-gray-600 dark:text-gray-400">
// //             Share your talent, skill, project or passion in a{" "}
// //             <span className="text-primary font-semibold">30–90 second</span>{" "}
// //             video or photo.
// //           </p>
// //         </div>

// //         {/* Prize Banner */}
// //         <div className="max-w-md mx-auto mb-12">
// //           <Card className="bg-gradient-to-r from-primary to-violet-600 text-white overflow-hidden">
// //             <CardBody className="flex flex-row items-center justify-center gap-4 py-6 px-8">
// //               <Trophy className="w-10 h-10 text-amber-300 shrink-0" />
// //               <div className="text-center">
// //                 <p className="text-sm opacity-80">Highest Votes Win</p>
// //                 <p className="text-3xl font-bold tracking-tight">
// //                   &#8358;10,000{" "}
// //                   <span className="text-lg font-medium">CASH</span>
// //                 </p>
// //               </div>
// //             </CardBody>
// //           </Card>
// //         </div>
// //       </div>

// //       {/* Categories */}
// //       <div className="container mx-auto px-4 mb-12">
// //         <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white mb-6">
// //           Choose Your Category
// //         </h2>
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
// //           {CATEGORIES.map((cat) => {
// //             const Icon = cat.icon;
// //             const isSelected = selectedCategory === cat.title;
// //             return (
// //               <button
// //                 key={cat.title}
// //                 className={`rounded-xl border-2 p-5 text-center transition-all hover:scale-[1.02] ${
// //                   isSelected
// //                     ? "ring-2 ring-offset-2 dark:ring-offset-gray-950"
// //                     : ""
// //                 } ${cat.bg} ${cat.border}`}
// //                 style={isSelected ? { borderColor: cat.color } : undefined}
// //                 onClick={() =>
// //                   setSelectedCategory(isSelected ? null : cat.title)
// //                 }
// //               >
// //                 <div
// //                   className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
// //                   style={{ backgroundColor: cat.color + "20" }}
// //                 >
// //                   <Icon className="w-6 h-6" style={{ color: cat.color }} />
// //                 </div>
// //                 <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
// //                   {cat.title}
// //                 </h3>
// //                 <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
// //                   {cat.description}
// //                 </p>
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* How to Join + Key Info */}
// //       <div className="container mx-auto px-4 mb-12">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
// //           {/* How to Join */}
// //           <div>
// //             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
// //               How to Join
// //             </h2>
// //             <div className="space-y-5">
// //               {STEPS.map((step) => {
// //                 const Icon = step.icon;
// //                 return (
// //                   <div key={step.step} className="flex gap-4">
// //                     <div className="flex flex-col items-center">
// //                       <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
// //                         {step.step}
// //                       </div>
// //                       {step.step < STEPS.length && (
// //                         <div className="w-0.5 flex-1 bg-primary/20 mt-1" />
// //                       )}
// //                     </div>
// //                     <div className="pb-5">
// //                       <div className="flex items-center gap-2 mb-1">
// //                         <Icon className="w-4 h-4 text-primary" />
// //                         <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
// //                           {step.title}
// //                         </h4>
// //                       </div>
// //                       <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
// //                         {step.description}
// //                       </p>
// //                       {step.bank && <BankDetails />}
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>

// //           {/* Key Info + Prizes */}
// //           <div className="space-y-6">
// //             <div>
// //               <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
// //                 Prizes
// //               </h2>
// //               <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-200 dark:border-amber-700/30">
// //                 <CardBody className="flex flex-row items-center gap-4 p-5">
// //                   <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
// //                     <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">
// //                       Highest Votes Win
// //                     </p>
// //                     <p className="text-2xl font-bold text-gray-900 dark:text-white">
// //                       &#8358;10,000{" "}
// //                       <span className="text-sm font-medium">CASH!</span>
// //                     </p>
// //                   </div>
// //                 </CardBody>
// //               </Card>
// //             </div>

// //             <div>
// //               <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
// //                 Key Info
// //               </h2>
// //               <Card className="dark:bg-gray-900 border dark:border-gray-800">
// //                 <CardBody className="p-5 space-y-4">
// //                   {KEY_INFO.map((info) => {
// //                     const Icon = info.icon;
// //                     return (
// //                       <div key={info.text} className="flex items-center gap-3">
// //                         <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
// //                           <Icon className="w-4 h-4 text-primary" />
// //                         </div>
// //                         <p className="text-sm text-gray-700 dark:text-gray-300">
// //                           {info.text}
// //                         </p>
// //                       </div>
// //                     );
// //                   })}
// //                 </CardBody>
// //               </Card>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Submission Form */}
// //       <div className="container mx-auto px-4 pb-12">
// //         <div className="max-w-2xl mx-auto">
// //           <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
// //             Submit Your Entry
// //           </h2>

// //           <div className="space-y-5">
// //             <Input
// //               label="Title"
// //               placeholder="Give your entry a catchy title"
// //               value={title}
// //               onValueChange={setTitle}
// //               variant="bordered"
// //             />

// //             <Input
// //               label="Video Link"
// //               placeholder="Paste your TikTok, YouTube, Instagram link"
// //               value={link}
// //               onValueChange={setLink}
// //               variant="bordered"
// //               startContent={<LinkIcon className="w-4 h-4 text-gray-400" />}
// //             />

// //             <Input
// //               label="Description (Optional)"
// //               placeholder="Tell us about your skill or what you're showcasing"
// //               value={description}
// //               onValueChange={setDescription}
// //               variant="bordered"
// //             />

// //             <Button
// //               className="w-full font-bold text-white bg-gradient-to-r from-primary to-violet-600 py-7 text-base"
// //               radius="full"
// //               size="lg"
// //               endContent={<ArrowRight className="w-5 h-5" />}
// //               startContent={<Upload className="w-5 h-5" />}
// //               isLoading={submitting}
// //               isDisabled={!selectedCategory || !link.trim() || !title.trim()}
// //               onPress={handleSubmit}
// //             >
// //               Submit Your Entry
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MagChallengePage;




// // USER — generic challenge page (poster + how to participate + entry form).
// // Route: /mag-challenge/:slug   e.g. /mag-challenge/photo-challenge
// // Put it OUTSIDE <ProtectedRoute>/<MainLayout> so the link can be opened without logging in;
// // logging in is only needed to submit (guests are sent to login and back).
// import { useCallback, useEffect, useState } from "react";
// import { Button } from "@heroui/button";
// import { Input, Textarea } from "@heroui/input";
// import Cookies from "js-cookie";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   ArrowRight,
//   CheckCircle2,
//   Link as LinkIcon,
//   Share2,
//   Trophy,
//   Upload,
//   Vote,
// } from "lucide-react";
// import {
//   useGetChallengeBySlug,
//   useGetMyChallengeStatus,
//   useSubmitChallengeEntry,
//   type Challenge,
//   type ChallengeStatus,
// } from "@/lib/graphql";
// import { ChallengeStateBadge, Spinner, StatusPill, endsLabel, errMsg } from "@/components/dailychalanges/magshared";
// import ShareModal from "@/components/dailychalanges/sharemodal";
// import { BankDetails } from "@/components/modules/bank-details";

// const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
// const isValidUrl = (s: string) => {
//   try {
//     return ["http:", "https:"].includes(new URL(s.trim()).protocol);
//   } catch {
//     return false;
//   }
// };

// const ChallengePage = () => {
//   const { slug = "" } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const loggedIn = !!Cookies.get("accessToken");

//   const [getChallenge] = useGetChallengeBySlug();
//   const [getStatus] = useGetMyChallengeStatus();
//   const { submitEntry, loading: submitting } = useSubmitChallengeEntry();

//   const [challenge, setChallenge] = useState<Challenge | null>(null);
//   const [status, setStatus] = useState<ChallengeStatus | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);

//   const [title, setTitle] = useState("");
//   const [link, setLink] = useState("");
//   const [description, setDescription] = useState("");
//   const [share, setShare] = useState<{ id: string; title?: string; fresh?: boolean } | null>(null);

//   const refreshStatus = useCallback(async () => {
//     if (!loggedIn) return;
//     try {
//       const r = await getStatus({ variables: { input: { slug } } });
//       setStatus(r.data?.GetMyChallengeStatus ?? null);
//     } catch {
//       /* page still works without it */
//     }
//   }, [getStatus, loggedIn, slug]);

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       setNotFound(false);
//       try {
//         const r = await getChallenge({ variables: { input: { slug } } });
//         if (r.data?.GetChallengeBySlug) setChallenge(r.data.GetChallengeBySlug);
//         else setNotFound(true);
//       } catch {
//         setNotFound(true);
//       } finally {
//         setLoading(false);
//       }
//       refreshStatus();
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [slug]);

//   const goLogin = () => {
//     const back = location.pathname;
//     sessionStorage.setItem("postLoginRedirect", back);
//     toast("Log in to submit your entry");
//     navigate(`/auth/login?redirect=${encodeURIComponent(back)}`);
//   };

//   const words = wordCount(description);
//   const max = challenge?.maxDescriptionWords ?? 0;
//   const valid =
//     !!title.trim() &&
//     isValidUrl(link) &&
//     (!challenge?.descriptionRequired || !!description.trim()) &&
//     (!max || words <= max);

//   const handleSubmit = async () => {
//     if (!challenge) return;
//     if (!loggedIn) return goLogin();
//     try {
//       const res = await submitEntry({
//         challengeId: challenge.id,
//         title: title.trim(),
//         url: link.trim(),
//         description: description.trim() || undefined,
//       });
//       const id = res.data?.SubmitChallengeEntry?.id;
//       toast.success("Entry submitted! Good luck!");
//       if (id) setShare({ id, title: title.trim(), fresh: true });
//       setTitle("");
//       setLink("");
//       setDescription("");
//       refreshStatus();
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (e) {
//       toast.error(errMsg(e));
//     }
//   };

//   const locked = !!challenge && (!challenge.isOpen || (status ? !status.canSubmit : false));

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-950">
//       {/* slim public header */}
//       <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
//         <div className="container mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
//           <Link to="/mag-challenge" className="font-bold text-gray-900 dark:text-white">
//             MAG <span className="text-primary">Challenge</span>
//           </Link>
//           {loggedIn ? (
//             <Link to="/user/mag-challenge/my-submissions" className="text-sm font-semibold text-primary">
//               My submissions
//             </Link>
//           ) : (
//             <Link
//               to={`/auth/login?redirect=${encodeURIComponent(location.pathname)}`}
//               className="text-sm font-semibold text-primary"
//             >
//               Log in
//             </Link>
//           )}
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8 pb-16">
//         {loading && <Spinner />}

//         {!loading && notFound && (
//           <div className="text-center py-16">
//             <p className="text-gray-500 mb-4">We couldn&apos;t find this challenge.</p>
//             <Button color="primary" radius="full" onPress={() => navigate("/mag-challenge")}>
//               See all challenges
//             </Button>
//           </div>
//         )}

//         {!loading && challenge && (
//           <>
//             {/* title */}
//             <div className="text-center max-w-2xl mx-auto mb-10">
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <ChallengeStateBadge open={challenge.isOpen} />
//                 <span className="text-xs text-gray-500">{endsLabel(challenge.endsAt, challenge.isOpen)}</span>
//               </div>
//               <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">{challenge.title}</h1>
//               {challenge.tagline && <p className="text-gray-600 dark:text-gray-400">{challenge.tagline}</p>}
//               {challenge.prize && (
//                 <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold px-4 py-1.5 text-sm">
//                   <Trophy className="w-4 h-4" /> {challenge.prize}
//                 </p>
//               )}
//               <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
//                 <Button
//                   variant="flat"
//                   color="primary"
//                   radius="full"
//                   startContent={<Vote className="w-4 h-4" />}
//                   onPress={() => navigate(`/mag-challenge/${challenge.slug}/vote`)}
//                 >
//                   Vote
//                 </Button>
//                 <Button
//                   variant="flat"
//                   color="primary"
//                   radius="full"
//                   startContent={<Trophy className="w-4 h-4" />}
//                   onPress={() => navigate(`/mag-challenge/${challenge.slug}/leaderboard`)}
//                 >
//                   Leaderboard
//                 </Button>
//               </div>
//             </div>

//             {/* poster + how to participate */}
//             <div
//               className={`grid grid-cols-1 ${challenge.image ? "md:grid-cols-2" : ""} gap-8 max-w-5xl mx-auto mb-12`}
//             >
//               {challenge.image && (
//                 <img alt={`${challenge.title} poster`} className="w-full rounded-2xl shadow-md" src={challenge.image} />
//               )}

//               <div className="space-y-6">
//                 {challenge.description && (
//                   <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{challenge.description}</p>
//                 )}

//                 {challenge.steps.length > 0 && (
//                   <section>
//                     <h2 className="text-xl font-bold mb-3">How to Participate</h2>
//                     <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
//                       {challenge.steps.map((s, i) => (
//                         <li key={i}>{s}</li>
//                       ))}
//                     </ol>
//                   </section>
//                 )}

//                 {challenge.showBankDetails && (
//                   <section className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
//                     <h3 className="text-sm font-semibold mb-1">Entry Fee Access</h3>
//                     {challenge.entryFeeNote && (
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{challenge.entryFeeNote}</p>
//                     )}
//                     <BankDetails />
//                   </section>
//                 )}
//               </div>
//             </div>

//             {/* submit */}
//             <div className="max-w-2xl mx-auto">
//               {/* ended */}
//               {!challenge.isOpen && (
//                 <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center">
//                   <p className="font-semibold text-gray-900 dark:text-white mb-1">This challenge has ended</p>
//                   <p className="text-sm text-gray-500 mb-4">Entries and voting are closed. See how everyone did.</p>
//                   <Button
//                     color="primary"
//                     radius="full"
//                     startContent={<Trophy className="w-4 h-4" />}
//                     onPress={() => navigate(`/mag-challenge/${challenge.slug}/leaderboard`)}
//                   >
//                     View leaderboard
//                   </Button>
//                 </div>
//               )}

//               {/* already entered */}
//               {challenge.isOpen && status?.hasSubmitted && !status.canSubmit && (
//                 <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
//                   <div className="flex items-start gap-3">
//                     <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
//                     <div className="flex-1 min-w-0">
//                       <p className="font-semibold text-gray-900 dark:text-white">You&apos;re in!</p>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{status.entry?.title}</p>
//                       <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
//                         <span>
//                           <b className="text-gray-900 dark:text-white">{status.votesCount}</b> vote
//                           {status.votesCount !== 1 && "s"}
//                         </span>
//                         {status.qualificationEnabled && <StatusPill qualified={!!status.entry?.qualified} />}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-3 mt-4">
//                     {status.entry?.id && (
//                       <Button
//                         color="primary"
//                         radius="full"
//                         startContent={<Share2 className="w-4 h-4" />}
//                         onPress={() => setShare({ id: status.entry!.id, title: status.entry!.title })}
//                       >
//                         Share your entry
//                       </Button>
//                     )}
//                     <Button
//                       variant="flat"
//                       radius="full"
//                       onPress={() => navigate(`/mag-challenge/${challenge.slug}/leaderboard`)}
//                     >
//                       Leaderboard
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               {/* form */}
//               {challenge.isOpen && !locked && (
//                 <>
//                   <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
//                     <Trophy className="w-5 h-5 text-amber-500" />
//                     Submit Your Entry
//                   </h2>
//                   <div className="space-y-5">
//                     <Input
//                       label={challenge.titleLabel}
//                       value={title}
//                       variant="bordered"
//                       onValueChange={setTitle}
//                     />
//                     <Input
//                       errorMessage="Enter a valid link starting with https://"
//                       isInvalid={!!link.trim() && !isValidUrl(link)}
//                       label={challenge.linkLabel}
//                       placeholder="Paste your link (TikTok, Instagram, YouTube, Google Drive...)"
//                       startContent={<LinkIcon className="w-4 h-4 text-gray-400" />}
//                       type="url"
//                       value={link}
//                       variant="bordered"
//                       onValueChange={setLink}
//                     />
//                     <Textarea
//                       description={max ? `${words}/${max} words` : undefined}
//                       errorMessage={`Keep it to ${max} words or less`}
//                       isInvalid={!!max && words > max}
//                       label={challenge.descriptionLabel}
//                       value={description}
//                       variant="bordered"
//                       onValueChange={setDescription}
//                     />
//                     <Button
//                       className="w-full font-bold text-white bg-gradient-to-r from-primary to-violet-600 py-7 text-base"
//                       endContent={<ArrowRight className="w-5 h-5" />}
//                       isDisabled={loggedIn && !valid}
//                       isLoading={submitting}
//                       radius="full"
//                       size="lg"
//                       startContent={<Upload className="w-5 h-5" />}
//                       onPress={handleSubmit}
//                     >
//                       {loggedIn ? "Submit Your Entry" : "Log in to submit"}
//                     </Button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </>
//         )}
//       </div>

//       <ShareModal
//         open={!!share}
//         onClose={() => setShare(null)}
//         submissionId={share?.id ?? null}
//         title={share?.title}
//         heading={share?.fresh ? "Entry submitted! Now get votes" : undefined}
//       />
//     </div>
//   );
// };

// export default ChallengePage;












// USER — list of challenges.  Route: mag-challenge   (inside ProtectedRoute / MainLayout)
import { useState } from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { History, Trophy, Vote } from "lucide-react";
import { useGetChallenges, type Challenge } from "@/lib/graphql";
import { ChallengeStateBadge, Spinner, endsLabel, usePaginated } from "@/components/dailychalanges/magshared";

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