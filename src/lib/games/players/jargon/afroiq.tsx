// import { useEffect, useRef, useState } from "react";

// import Button from "../components/button";
// import Loader, { LoaderRef } from "../components/loader";
// import Header from "../components/header";
// import { IAfroIq, useGetAfroIq, useGetGameLevelInformation, useVerifyAfroIqAnswer } from "@/lib/graphql";
// import { ENUMGAMEUSAGETYPES } from "@/enum";

// const Afroiq = () => {
//   const [loading, setLoading] = useState(true);
//   const ref = useRef<LoaderRef>(null);
//   const [started, setStarted] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [isWrong, setIsWrong] = useState(false);
//   const { data: levelInfoData, loading: levelInfoLoading } = useGetGameLevelInformation(currentLevel, "afroiq");
//  const [levelInfo, setLevelInfo] = useState<any>(null);
//   const [questionsAnswered, setQuestionsAnswered] = useState(0);
// const [score, setScore] = useState(0);
//   const [totalScore, setTotalScore] = useState(0);
//   const [startTime, setStartTime] = useState<number | null>(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//     const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

//   const [getQuestion, { loading: questionLoading }] = useGetAfroIq();
//    const [currentQuestion, setCurrentQuestion] = useState<IAfroIq | null>(
//       null
//     );  const [timeLimit, setTimeLimit] = useState<number | null>(null);

//   const [gameCompleted, setGameCompleted] = useState(false);

//   const { verifyAnswer, loading: verifying } = useVerifyAfroIqAnswer();

//   const [timeUp, setTimeUp] = useState(false);
//   const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);


//   const handleAnswer = async () => {
//     if (selectedAnswer === null || !currentQuestion || timeUp) return;

//     let answerText: string;

//     // Handle multiple choice or text answer
//     if (currentQuestion.options && currentQuestion.options.length > 0) {
//       answerText = currentQuestion.options[selectedAnswer];
//     } else {
//       // For text-based answers, you'd need an input field
//       // For now, we'll use the selected option index
//       return;
//     }

//     try {
//       const result = await verifyAnswer({
//         id: currentQuestion.id,
//         answer: answerText,
//       });

//       const verification =
//         (result.data as any)?.VerifyInterviewquestAnswerAndScore;
//         // ||
//         // (result.data as any)?.VerifyInterviewquestAnswer;

//       if (verification) {
//         const { correct } = verification;

//         if (correct) {
//           setScore(score + (levelInfo?.perclick || 10));
//           setIsCorrect(true);
//           setQuestionsAnswered(questionsAnswered + 1);
//         } else {
//           setIsWrong(true);
//         }

//         // After answering, no client-side mutation or auto-complete
//         // User can press Finish or Retry
//       }
//     } catch (error) {
//       console.error("Error verifying answer:", error);
//       setIsWrong(true);
//     }
//   };

//   const fetchQuestion = async () => {
//     try {
//       // setGetQuestionLoading(true)
//       const input: any = {
//         // level: currentLevel.toString(),
//         usageType:ENUMGAMEUSAGETYPES.NORMAL
//       };

//       const result = await getQuestion({
//         variables: { input },
//       });

//       if (result.data?.GetAfroIq) {
//         setCurrentQuestion(result.data.GetAfroIq);
//         setStartTime(Date.now());
//         setElapsedTime(0);
//         setSelectedAnswer(null);
//         setIsCorrect(false);
//         setIsWrong(false);
//       }
//     } catch (error) {
//       console.error("Error fetching question:", error);
//     }finally{
//       // setGetQuestionLoading(false)
//     }
//   };
//   const handleStart = async () => {
//     // if (blockedToday) return;
//     setStarted(true);
//     setScore(0);
//     setQuestionsAnswered(0);
//     setGameCompleted(false);
//     setTimeUp(false);
//     setElapsedTime(0);

//     // Mark played today (only for challenge mode)
 
//     await fetchQuestion();
//   };
//   const handleTimeUp = async () => {
//     // Stop timer and prevent further interactions
//     setTimeUp(true);
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//       timerIntervalRef.current = null;
//     }
//     // Mark as completed without client-side mutation
//     setGameCompleted(true);
//   };


//     useEffect(() => {
//     if (levelInfoData?.getGameLevelInformation) {
//       const info = levelInfoData.getGameLevelInformation;
//       setLevelInfo(info);
//       setTimeLimit(info.time || null);
//       setTotalScore(info.perclick || 10); // Single question per game
//     }
//   }, [levelInfoData]);

//     useEffect(() => {
//     if (started && startTime && timeLimit && !timeUp) {
//       timerIntervalRef.current = setInterval(() => {
//         const elapsed = Math.floor((Date.now() - startTime) / 1000);
//         setElapsedTime(elapsed);

//         if (elapsed >= timeLimit) {
//           // Time's up
//           setTimeUp(true);
//           if (timerIntervalRef.current) {
//             clearInterval(timerIntervalRef.current);
//             timerIntervalRef.current = null;
//           }
//           handleTimeUp();
//         }
//       }, 1000);

//       return () => {
//         if (timerIntervalRef.current) {
//           clearInterval(timerIntervalRef.current);
//           timerIntervalRef.current = null;
//         }
//       };
//     }
//   }, [started, startTime, timeLimit, timeUp]);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       ref.current?.start(() => {
//         setLoading(false);
//       });
//     }, 3000);

//     return () => clearTimeout(timeout);
//   }, []);

//   if (loading && !started) {
//     return <Loader ref={ref} imageUrl="/images/games/afro-iq.jpg" />;
//   }

//   return (
//     <div
//       className="relative w-full h-full bg-cover bg-center"
//       style={{
//         backgroundImage: "url(/images/games/bgs/bg-1.png)",
//       }}
//     >
//       <Header />

//       {!started && (
//         <div className="h-full relative">
//           <div className="flex mt-7 flex-col items-center justify-center h-full gap-5">
//             <h2 className="text-5xl md:text-8xl font-bold text-[#FF7101]">
//               AfroIQ
//             </h2>
//             <Button
//               backgroundColor="#4B4EFC"
//               stroke="white"
//               strokeWidth={3}
//               text="Play"
//               onClick={() => {
//                 setStarted(true);
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {started && !isCorrect && !isWrong && (
//         <>
//           {/* Mobile: Fixed position buttons - bottom right */}
//           <div className="fixed bottom-6 right-4 z-20 flex flex-col gap-3 md:hidden">
//             <button className="cursor-pointer">
//               <img
//                 alt="Wait"
//                 className="w-14 h-14 object-contain"
//                 src="/images/games/wait.png"
//               />
//             </button>
//             <button className="cursor-pointer">
//               <img
//                 alt="Hints"
//                 className="w-14 h-14 object-contain"
//                 src="/images/games/hint.png"
//               />
//             </button>
//           </div>

//           {/* Main content */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 lg:gap-10 mt-4 md:mt-7 p-4 md:p-6 lg:p-10 pb-24 md:pb-6">
//             {/* Desktop: Left button */}
//             <div className="hidden md:block flex-shrink-0">
//               <button className="cursor-pointer">
//                 <img
//                   alt="Wait"
//                   className="w-auto h-auto object-contain"
//                   src="/images/games/wait.png"
//                 />
//               </button>
//             </div>

//             {/* Main game content */}
//             <div className="w-full flex-1 max-w-2xl mx-auto md:mx-0 px-2 md:px-4 z-10">
//               <div className="">
//                 <h3 className="text-[#FF7101] text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl pb-4 md:pb-7 font-bold">
//                   Guess the Puzzle
//                 </h3>
//               </div>
//               <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6">
//                 <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 lg:gap-6">
//                   <div className="flex-1 flex items-center justify-center">
//                     <img
//                       alt="Puzzle piece 1"
//                       className="w-full max-w-[100px] sm:max-w-[120px] h-auto object-contain"
//                       src="/images/games/samples/1.png"
//                     />
//                   </div>

//                   <div className="flex-1 flex items-center justify-center">
//                     <img
//                       alt="Puzzle piece 2"
//                       className="w-full max-w-[100px] sm:max-w-[120px] h-auto object-contain"
//                       src="/images/games/samples/2.png"
//                     />
//                   </div>

//                   <div className="flex-1 flex items-center justify-center">
//                     <img
//                       alt="Puzzle piece 3"
//                       className="w-full max-w-[100px] sm:max-w-[120px] h-auto object-contain"
//                       src="/images/games/samples/3.png"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col">
//                 <div className="mb-3 md:mb-4">
//                   <input
//                     className="w-full bg-gray-700 text-white rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-base md:text-lg font-semibold placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
//                     placeholder="Input answer"
//                     style={{
//                       backgroundColor: "#4A4A4A",
//                     }}
//                     type="text"
//                   />
//                 </div>

//                 <button
//                   className="p-2.5 md:p-3 w-full bg-[#27C840] rounded-xl md:rounded-2xl text-base md:text-lg border-[3px] text-white border-white font-semibold"
//                   onClick={() => {
//                     setIsWrong(true);
//                   }}
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>

//             {/* Desktop: Right button */}
//             <div className="hidden md:block flex-shrink-0">
//               <button className="cursor-pointer">
//                 <img
//                   alt="Hints"
//                   className="w-auto h-auto object-contain"
//                   src="/images/games/hint.png"
//                 />
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       {started && isCorrect && (
//         <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
//           <div className="w-full max-w-xl bg-[#F9B20E] border-4 border-white rounded-3xl md:rounded-[40px] p-6 md:p-10 mb-6 md:mb-8">
//             <h2 className="text-3xl md:text-2xl lg:text-4xl font-bold text-white text-center mb-4 md:mb-6 uppercase tracking-wide">
//               CORRECT
//             </h2>

//             <div className="">
//               <img
//                 alt="Correct"
//                 className="w-full md:w-1/2 mx-auto my-3 h-full object-contain"
//                 src="/images/games/correct.png"
//               />
//               <p className="text-white text-center text-md md:text-xl font-extralight">
//                 Nice one - you earned +50 coin
//               </p>
//             </div>
//           </div>

//           <div className="w-full max-w-md flex flex-col gap-4">
//             <button
//               className="w-full bg-[#27C840] rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
//               onClick={() => {
//                 setIsCorrect(false);
//               }}
//             >
//               Next
//             </button>
//             <button
//               className="w-full bg-black rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
//               onClick={() => {
//                 setIsCorrect(false);
//               }}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}

//       {started && isWrong && (
//         <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
//           <div className="w-full max-w-xl bg-[#F9B20E] border-4 border-white rounded-3xl md:rounded-[40px] p-6 md:p-10 mb-6 md:mb-8">
//             <h2 className="text-3xl md:text-2xl lg:text-4xl font-bold text-white text-center mb-4 md:mb-6 uppercase tracking-wide">
//               Almost
//             </h2>

//             <div className="">
//               <p className="text-white text-center text-md md:text-xl font-extralight">
//                 The correct answer is hidden try again or use hint
//               </p>
//               <img
//                 alt="Wrong"
//                 className="w-[100px] mx-auto my-3 h-full object-contain"
//                 src="/images/games/wrong.png"
//               />
//             </div>
//           </div>

//           <div className="w-full max-w-md flex flex-col gap-2">
//             <button
//               className="w-full bg-[#27C840] rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
//               onClick={() => {
//                 setIsWrong(false);
//               }}
//             >
//               Try Again
//             </button>
//             <button
//               className="w-full bg-black rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
//               onClick={() => {
//                 setIsWrong(false);
//               }}
//             >
//               Use Hint
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Afroiq;

    {/* {!started && (
        <div className="h-full relative">
          <div className="flex mt-7 flex-col items-center justify-center h-full gap-5">
            <h2 className="text-5xl md:text-8xl font-bold text-[#FF7101]">
              AfroIQ
            </h2>
            <Button
              backgroundColor="#4B4EFC"
              stroke="white"
              strokeWidth={3}
              text="Play"
              onClick={() => {
                setStarted(true);
              }}
            />
          </div>
        </div>
      )} */}



//   return (
//     <div
//       className="relative w-full min-h-screen flex flex-col overflow-x-hidden"
//      style={{
//             // Note: We use encodeURIComponent or standard quoting for the path with spaces
//             backgroundImage: `url("/images/games/9e87e50fe0672b64592fd284e838b253b9b02639.jpg")`
//           }}
//     >
//       <Header />

//       {/* --- START SCREEN --- */}
//       {/* {!started && (
//         <div className="flex-1 flex flex-col items-center justify-center gap-10 p-4">
//           <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-10 duration-700">
//             <h1 className="text-7xl md:text-9xl font-black text-[#FF7101] italic tracking-tighter uppercase drop-shadow-2xl">
//               AfroIQ
//             </h1>
//             <p className="text-white/60 text-lg md:text-xl font-medium tracking-widest uppercase">
//               The Ultimate Visual Intelligence Challenge
//             </p>
//           </div>
          
//           <button 
//             onClick={handleStart}
//             className="group relative hover:scale-105 transition-transform duration-300"
//           >
//             <div className="absolute inset-0 bg-[#FF7101] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
//             <img alt="Play" className="w-40 md:w-56 relative z-10" src="/images/games/Interview-play.png" />
//           </button>
//         </div>
//       )} */}
// {!started && (
//         <div 
//           className="flex-1 flex flex-col items-center justify-center gap-10 p-4 bg-cover bg-center relative overflow-hidden"
//           style={{
//             // Note: We use encodeURIComponent or standard quoting for the path with spaces
//             backgroundImage: `url("${
//               window.innerWidth < 768 
//                 ? '/images/games/6604ad76fdcbfbb251d6b28e67d2d4a534e08409.jpg' 
//                 : '/images/games/c5c1fe8cbf4c33c84b5329d131280ce83345b884%20(2).jpg'
//             }")`
//           }}
//         >
//           {/* Dark Overlay to make the UI pop */}
//           <div className="absolute inset-0 bg-black/40" />

//           <div className="relative z-10 text-center space-y-2 animate-in fade-in slide-in-from-bottom-10 duration-700">
//             {/* <h1 className="text-7xl md:text-9xl font-black text-[#FF7101] italic tracking-tighter uppercase drop-shadow-2xl">
//               AfroIQ
//             </h1>
//             <p className="text-white/80 text-lg md:text-xl font-medium tracking-widest uppercase">
//               The Ultimate Visual Intelligence Challenge
//             </p> */}
//           </div>
          
//           <button 
//             onClick={handleStart}
//             className="group relative z-10 hover:scale-105 transition-transform duration-300"
//           >
//             <div className="absolute inset-0 bg-[#FF7101] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
//             <img 
//               alt="Play" 
//               className="w-40 md:w-56 relative z-10" 
//               src="/images/games/Interview-play.png" 
//             />
//           </button>
//         </div>
//       )}
//       {/* --- ACTIVE GAMEPLAY --- */}
//       {started && !isCorrect && !isWrong && !timeUp && currentQuestion && (
//         <div className="flex-1 flex flex-col md:flex-row gap-6 p-4 md:p-10 max-w-7xl mx-auto w-full">
          
//           {/* Left Column: The Visuals */}
//           <div className="flex-[1.4] bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 p-8 flex flex-col shadow-2xl">
//             <div className="flex justify-between items-center mb-10">
//               <div className="space-y-1">
//                 <p className="text-[#FF7101] font-black text-sm tracking-[0.3em] uppercase italic">Challenge</p>
//                 <h2 className="text-white text-3xl font-bold italic uppercase">Guess the Puzzle</h2>
//               </div>
//               <div className="bg-black/40 px-6 py-3 rounded-2xl border border-white/10 text-center min-w-[120px]">
//                 <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Time Left</p>
//                 <p className="text-white text-2xl font-mono font-black">
//                   {Math.max(0, (timeLimit || 0) - elapsedTime)}s
//                 </p>
//               </div>
//             </div>

//             {/* Dynamic Image Container */}
//             <div className="flex-1 bg-white/10 rounded-[32px] p-6 flex flex-wrap items-center justify-center gap-4 min-h-[300px]">
//               {currentQuestion.images?.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt={`Puzzle piece ${idx + 1}`}
//                   className="w-32 md:w-48 h-auto object-contain animate-in zoom-in duration-500 delay-150"
//                 />
//               ))}
//               {!currentQuestion.images?.length && (
//                 <p className="text-white/20 italic">No visual assets found for this challenge.</p>
//               )}
//             </div>


//             {currentQuestion.hint && (
//               <div className="mt-8 p-5 bg-[#FF7101]/10 border border-[#FF7101]/20 rounded-2xl text-[#FF7101] font-bold text-center italic animate-pulse">
//                 💡 HINT: {currentQuestion.hint}
//               </div>
//             )}
//           </div>

//           {/* Right Column: Interaction */}
//           <div className="flex-1 flex flex-col gap-6">
//             <div className="bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 p-8 flex-1 flex flex-col justify-center gap-8 shadow-2xl">
//               <div className="space-y-4">
//                 <h3 className="text-white text-xl font-bold uppercase tracking-widest text-center">Enter Answer</h3>
//                 <input
//                   type="text"
//                   value={answerInput}
//                   onChange={(e) => setAnswerInput(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
//                   placeholder="WHAT DO YOU SEE?"
//                   className="w-full bg-white/10 border-2 border-white/20 rounded-2xl p-6 text-white text-2xl font-black text-center focus:border-[#FF7101] focus:bg-white/20 outline-none transition-all placeholder:text-white/10 uppercase"
//                 />
//               </div>

//               <button
//                 disabled={!answerInput || verifying}
//                 onClick={handleSubmit}
//                 className="w-full bg-[#27C840] hover:bg-[#1fa533] disabled:opacity-50 text-white rounded-2xl py-6 text-2xl font-black border-b-[6px] border-black/30 active:border-b-0 active:translate-y-[6px] transition-all shadow-lg"
//               >
//                 {verifying ? "VERIFYING..." : "SUBMIT RESPONSE"}
//               </button>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <button 
//                 onClick={() => navigate("/games")}
//                 className="bg-black/40 hover:bg-black/60 text-white/50 hover:text-white py-4 rounded-2xl font-bold transition-all uppercase text-xs tracking-widest"
//               >
//                 Exit Game
//               </button>
//               <button className="bg-white/5 hover:bg-white/10 text-white/50 hover:text-white py-4 rounded-2xl font-bold transition-all uppercase text-xs tracking-widest">
//                 Help
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- RESULT SCREENS --- */}
//       {started && (isCorrect || isWrong || timeUp) && (
//         <div className="flex-1 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
//           <div className={`w-full max-w-xl rounded-[60px] border-8 border-white p-12 text-center shadow-2xl ${isCorrect ? 'bg-[#27C840]' : 'bg-[#FF7101]'}`}>
//             <img 
//               src={isCorrect ? "/images/games/correct.png" : (timeUp ? "/images/games/time.png" : "/images/games/wrong.png")} 
//               alt="status" 
//               className="w-32 h-32 mx-auto mb-8 object-contain" 
//             />
            
//             <h2 className="text-5xl font-black text-white italic mb-4 uppercase tracking-tighter">
//               {isCorrect ? "Brilliant!" : (timeUp ? "Time's Up!" : "Not Quite!")}
//             </h2>
            
//             <p className="text-white text-xl font-bold mb-10 leading-relaxed">
//               {isCorrect 
//                 ? `Incredible eye. You earned +${levelInfo?.perclick || 10} IQ Points.` 
//                 : (timeUp ? "You ran out of time. Keep focused!" : "The puzzle was tricky. Give it another shot.")}
//             </p>

//             <div className="flex flex-col gap-4">
//               <button 
//                 onClick={isCorrect ? fetchQuestion : handleStart}
//                 className="w-full bg-white text-black py-5 rounded-3xl text-2xl font-black hover:scale-105 transition-transform shadow-xl"
//               >
//                 {isCorrect ? "NEXT CHALLENGE" : "TRY AGAIN"}
//               </button>
//               <button 
//                 onClick={() => navigate("/games")}
//                 className="w-full bg-black/20 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm"
//               >
//                 Return to Games
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

