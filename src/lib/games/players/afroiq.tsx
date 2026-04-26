

// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   IAfroIq, 
//   useGetAfroIq, 
//   useGetGameLevelInformation, 
//   useVerifyAfroIqAnswer 
// } from "@/lib/graphql";
// import { ENUMGAMEUSAGETYPES } from "@/enum";

// import Button from "../components/button";
// import Loader, { LoaderRef } from "../components/loader";
// import Header from "../components/header";

// const Afroiq = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const ref = useRef<LoaderRef>(null);
  
//   // Gameplay States
//   const [started, setStarted] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [isWrong, setIsWrong] = useState(false);
//   const [answerInput, setAnswerInput] = useState("");
  
//   // Game Logic & Meta
//   const [currentLevel, setCurrentLevel] = useState(1);
//   const [levelInfo, setLevelInfo] = useState<any>(null);
//   const [score, setScore] = useState(0);
//   const [startTime, setStartTime] = useState<number | null>(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [timeLimit, setTimeLimit] = useState<number | null>(null);
//   const [timeUp, setTimeUp] = useState(false);

//   // Queries/Mutations
//   const [getQuestion, { loading: questionLoading }] = useGetAfroIq();
//   const { verifyAnswer, loading: verifying } = useVerifyAfroIqAnswer();
//   const { data: levelInfoData } = useGetGameLevelInformation(currentLevel, "afroiq");
  
//   const [currentQuestion, setCurrentQuestion] = useState<IAfroIq | null>(null);
//   const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (levelInfoData?.getGameLevelInformation) {
//       const info = levelInfoData.getGameLevelInformation;
//       console.log(info,"infoooo")
//       setLevelInfo(info);
//       setTimeLimit(info.time || 30);
//     }else{
     
//       setTimeLimit( 10);
//     }
//   }, [levelInfoData]);

//   // Timer Implementation
//   useEffect(() => {
//     if (started && startTime && timeLimit && !timeUp && !isCorrect && !isWrong) {
//       timerIntervalRef.current = setInterval(() => {
//         const elapsed = Math.floor((Date.now() - startTime) / 1000);
//         setElapsedTime(elapsed);

//         if (elapsed >= timeLimit) {
//           setTimeUp(true);
//           if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//         }
//       }, 1000);

//       return () => {
//         if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//       };
//     }
//   }, [started, startTime, timeLimit, timeUp, isCorrect, isWrong]);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       ref.current?.start(() => setLoading(false));
//     }, 2000);
//     return () => clearTimeout(timeout);
//   }, []);

//   const fetchQuestion = async () => {
//     try {
//       const result = await getQuestion({
//         variables: { input: { usageType: ENUMGAMEUSAGETYPES.NORMAL } },
//       });

//       if (result.data?.GetAfroIq) {
//         setCurrentQuestion(result.data.GetAfroIq);
//         setStartTime(Date.now());
//         setElapsedTime(0);
//         setAnswerInput("");
//         setIsCorrect(false);
//         setIsWrong(false);
//         setTimeUp(false);
//       }
//     } catch (err) {
//       console.error("Fetch failed:", err);
//     }
//   };

//   const handleStart = async () => {
//     setStarted(true);
//     setScore(0);
//     await fetchQuestion();
//   };

//   const handleSubmit = async () => {
//     if (!answerInput || !currentQuestion || timeUp) return;

//     try {
//       const result = await verifyAnswer({
      
//           id: currentQuestion.id,
//           answer: answerInput.trim(),
     
//       });

//       const verification = (result.data as any)?.VerifyAfroiqAnswer;

//       if (verification?.correct) {
//         setScore(score + (levelInfo?.perclick || 10));
//         setIsCorrect(true);
//       } else {
//         setIsWrong(true);
//       }
//     } catch (error) {
//       setIsWrong(true);
//     }
//   };

//   if (loading && !started) {
//     return <Loader ref={ref} imageUrl="/images/games/afro-iq.jpg" />;
//   }

//  return (

//   <>
//      {!started ? (
//         <div 
//           className="flex-1 w-full h-full flex flex-col items-center justify-center gap-10 p-4 bg-cover bg-center relative overflow-hidden"
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
//       )
    
    
    
//     :
//     <div
//       className="relative w-full h-full bg-cover bg-center"
//       style={{
//         backgroundImage: "url(/images/games/bgs/bg-1.png)",
//       }}
//     >
//       {/* <Header /> */}
//         <div>
//       <div className="flex flex-row items-center justify-between w-full h-[70px] p-[15px]">
//         <Button
//           backgroundColor="#FA0000"
//           height={40}
//           text="Exit"
//           width={100}
//           onClick={() => navigate("/games")}
//         />

//         {/* Right side: Share then Points */}
//         <div className="flex items-center gap-3  ">
     

//        <p className="text-white text-2xl font-mono font-black">
//                   {Math.max(0, (timeLimit || 0) - elapsedTime)}s
//                </p>
//           <div className="relative flex items-center h-10 w-[130px]">
//             <div className="absolute inset-0 bg-[#C56101] rounded-[20px]" />

//             <div className="absolute flex items-center justify-center left-[26px] top-1/2 -translate-x-1/2 -translate-y-1/2">
//               <div className="absolute w-7 h-7 bg-[#FFC723] rounded-full border-2 border-transparent" />
//               <div className="absolute w-[18px] h-[18px] rounded-full border border-white" />
//             </div>
//             <span className="relative font-bold text-white text-center text-[20px] ml-12 w-[55px]">
//               { score.toFixed(2)}
              
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>

  

//           {started &&  !isCorrect && !isWrong && ( timeUp) && (
//         <div className="flex-1 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
//           <div className={`w-full max-w-xl rounded-[60px] border-8 border-white p-12 text-center shadow-2xl ${isCorrect ? 'bg-[#27C840]' : 'bg-[#FF7101]'}`}>
        
            
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
//                 // onClick={isCorrect ? fetchQuestion : handleStart}
//                 onClick={fetchQuestion}
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

//       {started && !isCorrect && !isWrong && !timeUp &&  (
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
//             <button onClick={()=>{
//               // shot hint in a modal for a short period of time
//               let hint_ =  currentQuestion?.hint??"No Hint Available"
//             }} className="cursor-pointer">
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
//                   {/* <div className="flex-1 flex items-center justify-center">
//                     <img
//                       alt="Puzzle piece 1"
//                       className="w-full max-w-[100px] sm:max-w-[120px] h-auto object-contain"
//                       src="/images/games/samples/1.png"
//                     />
//                   </div> */}
//                        {(currentQuestion?.images??[])?.map((img, idx) => (
          

//                       <div className="flex-1 key={idx} flex items-center justify-center">
//                     <img
//             alt={`Puzzle piece ${idx + 1}`}
//                       className="w-full max-w-[100px] sm:max-w-[120px] h-auto object-contain"
//                       // src="/images/games/samples/1.png"
//                       src={img}
//                     />
//                   </div>
//               ))}

//                   {/* <div className="flex-1 flex items-center justify-center">
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
//                   </div> */}
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
//                      value={answerInput}
//                   onChange={(e) => setAnswerInput(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
//                   />
//                 </div>

//                 <button
//                   className="p-2.5 md:p-3 w-full bg-[#27C840] rounded-xl md:rounded-2xl text-base md:text-lg border-[3px] text-white border-white font-semibold"
//                   // onClick={() => {
//                   //   setIsWrong(true);
//                   // }}
//                    disabled={!answerInput || verifying}
//                 onClick={handleSubmit}
//                 >
//                   {verifying ? "VERIFYING..." : "Verify"}
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
//                 Nice one - you earned +10 coin
//               </p>
//             </div>
//           </div>

//           <div className="w-full max-w-md flex flex-col gap-4">
//             <button
//               className="w-full bg-[#27C840] rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
//               // onClick={() => {
//               //   setIsCorrect(false);
//               // }}
//               onClick={fetchQuestion}
//             >
//               Next
//             </button>
//             <button
//               className="w-full bg-black rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
//         onClick={() => navigate("/games")}
//             >
//               Exit
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
//               onClick={fetchQuestion}
//             >
//               Try Again
//             </button>
//             <button
//               className="w-full bg-black rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
//               onClick={() => {
//       // display hint modal
//               }}
//             >
//               Use Hint
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//     }
//   </>
//   );


// };

// export default Afroiq;



import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  IAfroIq, 
  useGetAfroIq, 
  useGetGameLevelInformation, 
  useVerifyAfroIqAnswer 
} from "@/lib/graphql";
import { ENUMGAMEUSAGETYPES } from "@/enum";

import Button from "../components/button";
import Loader, { LoaderRef } from "../components/loader";
// import Header from "../components/header";
import toast from "react-hot-toast";

const SUCCESS_AUDIO_SRC = "/audio/success.mp4";
const FAIL_AUDIO_SRC = "/audio/fail.mp4";

const Afroiq = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const ref = useRef<LoaderRef>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const failAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Gameplay States
  const [started, setStarted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [answerInput, setAnswerInput] = useState("");
  const [showHint, setShowHint] = useState(false); // Hint Modal State
  
  // Game Logic & Meta
  const [currentLevel, _setCurrentLevel] = useState(1);
  const [levelInfo, setLevelInfo] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [timeUp, setTimeUp] = useState(false);

  // Queries/Mutations
  const [getQuestion, { loading: _questionLoading }] = useGetAfroIq();
  const { verifyAnswer, loading: verifying } = useVerifyAfroIqAnswer();
  const { data: levelInfoData } = useGetGameLevelInformation(currentLevel, "afroiq");
  
  const [currentQuestion, setCurrentQuestion] = useState<IAfroIq | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (levelInfoData?.getGameLevelInformation) {
      const info = levelInfoData.getGameLevelInformation;
      setLevelInfo(info);
      setTimeLimit(info.time || 30);
    } else {
      setTimeLimit(30);
    }
  }, [levelInfoData]);

  // Timer Implementation
  useEffect(() => {
    if (started && startTime && timeLimit && !timeUp && !isCorrect && !isWrong) {
      timerIntervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);

        if (elapsed >= timeLimit) {
          setTimeUp(true);
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        }
      }, 1000);

      return () => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      };
    }
  }, [started, startTime, timeLimit, timeUp, isCorrect, isWrong]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.start(() => setLoading(false));
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const successAudio = new Audio(SUCCESS_AUDIO_SRC);
    successAudio.preload = "auto";

    const failAudio = new Audio(FAIL_AUDIO_SRC);
    failAudio.preload = "auto";

    successAudioRef.current = successAudio;
    failAudioRef.current = failAudio;

    successAudio.load();
    failAudio.load();

    return () => {
      [successAudioRef.current, failAudioRef.current].forEach((audio) => {
        if (!audio) return;
        audio.pause();
        audio.src = "";
      });

      successAudioRef.current = null;
      failAudioRef.current = null;
    };
  }, []);

  const playAudio = (audio: HTMLAudioElement | null) => {
    if (!audio) return;

    audio.currentTime = 0;
    void audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  };

  useEffect(() => {
    if (!timeUp || isCorrect || isWrong) return;
    playAudio(failAudioRef.current);
  }, [timeUp, isCorrect, isWrong]);

  const triggerHint = () => {
    setShowHint(true);
    // Automatically hide after 5 seconds
    setTimeout(() => {
      setShowHint(false);
    }, 5000);
  };

  const fetchQuestion = async () => {
    try {
      const result = await getQuestion({
        variables: { input: { usageType: ENUMGAMEUSAGETYPES.NORMAL } },
      });

      if (result.data?.GetAfroIq) {
        setCurrentQuestion(result.data.GetAfroIq);
        setStartTime(Date.now());
        setElapsedTime(timeLimit||0);
        setAnswerInput("");
        setIsCorrect(false);
        setIsWrong(false);
        setTimeUp(false);
        setShowHint(false);
      }
    } catch (err:any) {
      // console.dir(err,{depth:10})
      toast.error(err?.message)
      console.error("Fetch failed:", err?.message);
    }
  };

  const handleStart = async () => {
    setStarted(true);
    setScore(0);
    await fetchQuestion();
  };

  const handleSubmit = async () => {
    if (!answerInput || !currentQuestion || timeUp) return;

    try {
      const result = await verifyAnswer({
    
          id: currentQuestion.id,
          answer: answerInput.trim(),
        
      });

      const verification = (result.data as any)?.VerifyAndScoreAfroiqAnswer;

      if (verification?.correct) {
        setScore(score + (levelInfo?.perclick || 10));
        playAudio(successAudioRef.current);
        setIsCorrect(true);
      } else {
        playAudio(failAudioRef.current);
        setIsWrong(true);
      }
    } catch (error) {
      playAudio(failAudioRef.current);
      setIsWrong(true);
    }
  };

  if (loading && !started) {
    return <Loader ref={ref} imageUrl="/images/games/afro-iq.jpg" />;
  }

  return (
    <>
      {/* Hint Modal Overlay */}
      {showHint && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#F9B20E] border-4 border-white rounded-[30px] p-8 max-w-sm w-full text-center shadow-2xl relative animate-in zoom-in duration-300">
            <button 
              onClick={() => setShowHint(false)}
              className="absolute top-4 right-4 text-white font-bold text-xl"
            >
              ✕
            </button>
            <img src="/images/games/hint.png" alt="Hint" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-white text-2xl font-black mb-2 uppercase italic">Puzzle Hint</h3>
            <p className="text-white text-lg font-medium">
              {currentQuestion?.hint || "Look closely at the patterns!"}
            </p>
            <div className="mt-6 w-full bg-white/20 h-1 rounded-full overflow-hidden">
               <div className="bg-white h-full animate-shrink" style={{ animation: 'shrink 5s linear forwards' }} />
            </div>
          </div>
        </div>
      )}

      {!started ? (
        <div 
          className="flex-1 w-full h-full flex flex-col items-center justify-center gap-10 p-4 bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage: `url("${
              window.innerWidth < 768 
                ? '/images/games/6604ad76fdcbfbb251d6b28e67d2d4a534e08409.jpg' 
                : '/images/games/c5c1fe8cbf4c33c84b5329d131280ce83345b884%20(2).jpg'
            }")`
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <button 
            onClick={handleStart}
            className="group relative z-10 hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute inset-0 bg-[#FF7101] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <img alt="Play" className="w-40 md:w-56 relative z-10" src="/images/games/Interview-play.png" />
          </button>
        </div>
      ) : (
        <div
          className="relative w-full h-full bg-cover bg-center overflow-y-auto"
          style={{ backgroundImage: "url(/images/games/bgs/bg-1.png)" }}
        >
          <div className="flex flex-row items-center justify-between w-full h-[70px] p-[15px]">
            <Button
              backgroundColor="#FA0000"
              height={40}
              text="Exit"
              width={100}
              onClick={() => navigate("/games")}
            />

            <div className="flex items-center gap-3">
              <p className="text-white text-2xl font-mono font-black">
                {Math.max(0, (timeLimit || 0) - elapsedTime)}s
              </p>
              <div className="relative flex items-center h-10 w-[130px]">
                <div className="absolute inset-0 bg-[#C56101] rounded-[20px]" />
                <div className="absolute flex items-center justify-center left-[26px] top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute w-7 h-7 bg-[#FFC723] rounded-full border-2 border-transparent" />
                  <div className="absolute w-[18px] h-[18px] rounded-full border border-white" />
                </div>
                <span className="relative font-bold text-white text-center text-[20px] ml-12 w-[55px]">
                  {score.toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          {/* Time Up Result */}
          {timeUp && !isCorrect && !isWrong && (
            <div className="flex-1 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
              <div className="w-full max-w-xl rounded-[60px] border-8 border-white p-12 text-center shadow-2xl bg-[#FF7101]">
                <h2 className="text-5xl font-black text-white italic mb-4 uppercase tracking-tighter">Time's Up!</h2>
                <p className="text-white text-xl font-bold mb-10 leading-relaxed">You ran out of time. Keep focused!</p>
                <div className="flex flex-col gap-4">
                  <button onClick={fetchQuestion} className="w-full bg-white text-black py-5 rounded-3xl text-2xl font-black hover:scale-105 transition-transform shadow-xl">TRY AGAIN</button>
                  <button onClick={() => navigate("/games")} className="w-full bg-black/20 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm">Return to Games</button>
                </div>
              </div>
            </div>
          )}

          {/* Gameplay Content */}
          {!isCorrect && !isWrong && !timeUp && (
            <>
              {/* Mobile Buttons */}
              <div className=" flex item-center justify-between   z-20 flex flex-cl gap-3 md:hidden md:mt-3">
                <button className="cursor-pointer">
                  <img alt="Wait" className="w-20  object-contain" src="/images/games/wait.png" />
                </button>
                <button onClick={triggerHint} className="cursor-pointer">
                  <img alt="Hints" className="w-20  object-contain" src="/images/games/hint.png" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 lg:gap-10 mt-4 md:mt-7 p-4 md:p-6 lg:p-10 pb-24 md:pb-6">
                <div className="hidden md:block flex-shrink-0">
                  <button className="cursor-pointer">
                    <img alt="Wait" className="w-auto h-auto object-contain" src="/images/games/wait.png" />
                  </button>
                </div>

                <div className="w-full flex-1 max-w-2xl mx-auto md:mx-0 px-2 md:px-4 z-10">
                  <h3 className="text-[#FF7101] text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl pb-4 md:pb-7 font-bold">Guess the Puzzle</h3>
                  <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 lg:gap-6">
                      {(currentQuestion?.images ?? []).map((img, idx) => (
                        <div 
                          key={idx} 
                          className="flex-1 w-full flex items-center justify-center rounded-lg overflow-hidden"
                          style={{
                            backgroundImage: `url(${img})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            minHeight: '150px',
                            maxHeight: '200px',
                            height: 'auto',
                            aspectRatio: '1'
                          }}
                        >
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <input
                      className="w-full bg-[#4A4A4A] text-white rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-base md:text-lg font-semibold placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
                      placeholder="Input answer"
                      type="text"
                      value={answerInput}
                      onChange={(e) => setAnswerInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <button
                      disabled={!answerInput || verifying}
                      onClick={handleSubmit}
                      className="p-2.5 md:p-3 w-full bg-[#27C840] rounded-xl md:rounded-2xl text-base md:text-lg border-[3px] text-white border-white font-semibold"
                    >
                      {verifying ? "VERIFYING..." : "Verify"}
                    </button>
                  </div>
                </div>

                <div className="hidden md:block flex-shrink-0">
                  <button onClick={triggerHint} className="cursor-pointer">
                    <img alt="Hints" className="w-auto h-auto object-contain" src="/images/games/hint.png" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Correct Result */}
          {isCorrect && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-xl bg-[#F9B20E] border-4 border-white rounded-3xl md:rounded-[40px] p-6 md:p-10 mb-6 md:mb-8 text-center shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide">CORRECT</h2>
                <img alt="Correct" className="w-48 mx-auto mb-4" src="/images/games/correct.png" />
                <p className="text-white text-xl font-extralight italic">Nice one - you earned +10 IQ Points</p>
              </div>
              <div className="w-full max-w-md flex flex-col gap-4">
                <button onClick={fetchQuestion} className="w-full bg-[#27C840] rounded-2xl py-5 text-white font-bold text-xl border-b-4 border-black/20">Next</button>
                <button onClick={() => navigate("/games")} className="w-full bg-black rounded-2xl py-5 text-white font-bold text-xl">Exit</button>
              </div>
            </div>
          )}

          {/* Wrong Result */}
          {isWrong && !timeUp && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-xl bg-[#F9B20E] border-4 border-white rounded-3xl md:rounded-[40px] p-6 md:p-10 mb-6 md:mb-8 text-center shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide">Almost</h2>
                <p className="text-white text-xl font-extralight mb-4">Try again or use a hint!</p>
                <img alt="Wrong" className="w-24 mx-auto" src="/images/games/wrong.png" />
              </div>
              <div className="w-full max-w-md flex flex-col gap-2">
                <button onClick={() => setIsWrong(false)} className="w-full bg-[#27C840] rounded-2xl py-5 text-white font-bold text-xl border-b-4 border-black/20">Try Again</button>
                <button onClick={triggerHint} className="w-full bg-black rounded-2xl py-5 text-white font-bold text-xl">Use Hint</button>
              </div>
            </div>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-shrink {
          animation: shrink 5s linear forwards;
        }
      `}} />
    </>
  );
};

export default Afroiq;
