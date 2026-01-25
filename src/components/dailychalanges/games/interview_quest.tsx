import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiftIcon, Timer, AlertCircle, CheckCircle2, X } from "lucide-react";

import type { InterviewQuest } from "@/lib/graphql/types";
import {
  useGetInterviewQuest,
  useGetGameLevelInformation,
  useGetGamersCurrentPassedResult,
  useVerifyInterviewQuestAnswer,
} from "@/lib/graphql";
import { useAuth } from "@/lib/auth-context";
import Loader, { LoaderRef } from "@/lib/games/components/loader";
import { ENUMGAMEUSAGETYPES } from "@/enum";

const InterviewQuestChallengeModal = ({ onClose }: { onClose?: () => void }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const ref = useRef<LoaderRef>(null);
  const [started, setStarted] = useState(false);
  const [blockedToday, setBlockedToday] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuest | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelInfo, setLevelInfo] = useState<any>(null);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [timeUp, setTimeUp] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { user } = useAuth();
  const username = user?.username;

  const { data: passedResultData } = useGetGamersCurrentPassedResult("interviewquest");
  const { data: levelInfoData, loading: levelInfoLoading } = useGetGameLevelInformation(currentLevel, "interviewquest");
  const [getQuestion] = useGetInterviewQuest();
  const { verifyAnswer, loading: verifying } = useVerifyInterviewQuestAnswer();

  useEffect(() => {
    if (passedResultData?.getGamersCurrentPassedResult) {
      setCurrentLevel(passedResultData.getGamersCurrentPassedResult.level + 1);
    }
  }, [passedResultData]);

  useEffect(() => {
    const todayKey = new Date().toISOString().slice(0, 10);
    const gameKey = `mag:played:interviewquest:challenge:${username || "guest"}:${todayKey}`;
    setBlockedToday(!!localStorage.getItem(gameKey));
  }, [username]);

  useEffect(() => {
    if (levelInfoData?.getGameLevelInformation) {
      const info = levelInfoData.getGameLevelInformation;
      setLevelInfo(info);
      setTimeLimit(info.time || 30);
    }
  }, [levelInfoData]);

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
      return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
    }
  }, [started, startTime, timeLimit, timeUp, isCorrect, isWrong]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.start(() => setLoading(false));
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handleStart = async () => {
    if (blockedToday) return;
    setStarted(true);
    const todayKey = new Date().toISOString().slice(0, 10);
    localStorage.setItem(`mag:played:interviewquest:challenge:${username || "guest"}:${todayKey}`, "1");
    
    try {
      const result = await getQuestion({ variables: { input: { level: currentLevel.toString() ,usageType:ENUMGAMEUSAGETYPES.DAILY_CHALLENGE} } });
      if (result.data?.GetInterviewQuest) {
        setCurrentQuestion(result.data.GetInterviewQuest);
        setStartTime(Date.now());
      }
    } catch (e) { console.error(e); }
  };

  const handleAnswer = async () => {
    if (selectedAnswer === null || !currentQuestion || timeUp) return;
    try {
      const result = await verifyAnswer({ id: currentQuestion.id, answer: (currentQuestion as any)?.options[selectedAnswer] });
      const verification = (result.data as any)?.VerifyInterviewquestAnswerAndScore;
      if (verification?.correct) {
        setScore(levelInfo?.perclick || 10);
        setIsCorrect(true);
      } else {
        setIsWrong(true);
      }
    } catch (e) { setIsWrong(true); }
  };

  const handleFinish = () => {
    if (onClose) onClose();
    navigate("/challenges");
  };

  if (loading && !started) return <Loader ref={ref} imageUrl="/images/games/interview-quest.jpg" />;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/20">
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <img src="/images/asset-2.png" alt="" className="w-64" />
        </div>

        {/* Close Button */}
        <button onClick={handleFinish} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-primary z-10">
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          
          {/* 1. START STATE */}
          {!started && (
            <div className="flex flex-col items-center text-center space-y-8 py-8">
              <div className="flex items-center gap-2 text-secondary bg-secondary/10 px-4 py-2 rounded-full font-medium">
                <GiftIcon size={18} />
                <span>Daily Challenge Bonus</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">Interview Quest</h1>
                <p className="text-slate-500 max-w-md mx-auto">Level {currentLevel}: One question, one shot at glory. Are you ready?</p>
              </div>
              <button
                disabled={levelInfoLoading || blockedToday}
                onClick={handleStart}
                className="group relative px-12 py-5 bg-[#E69A17] hover:bg-[#d48c12] text-white font-black text-xl rounded-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg shadow-orange-500/20"
              >
                {blockedToday ? "Already Played" : "START CHALLENGE"}
              </button>
            </div>
          )}

          {/* 2. ACTIVE QUESTION STATE */}
          {started && !isCorrect && !isWrong && !timeUp && currentQuestion && (
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b pb-6">
                <div className="flex items-center gap-3 text-primary">
                  <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                    <Timer size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-50">Time Remaining</p>
                    <p className="text-2xl font-mono font-bold">{Math.max(0, (timeLimit || 0) - elapsedTime)}s</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase font-bold opacity-50">Level</p>
                  <p className="text-xl font-bold text-primary">{currentLevel}</p>
                </div>
              </div>

              <div className="py-6">
                <h2 className="text-2xl md:text-3xl font-bold text-primary text-center leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options?.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`group flex items-center gap-4 p-5 rounded-2xl text-left border-2 transition-all ${
                      selectedAnswer === index 
                        ? "border-secondary bg-secondary/5 text-secondary" 
                        : "border-slate-100 bg-slate-50 hover:border-secondary/30 text-slate-700"
                    }`}
                  >
                    <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold transition-colors ${
                      selectedAnswer === index ? "bg-secondary text-white" : "bg-slate-200 text-slate-500"
                    }`}>
                      {index + 1}
                    </span>
                    <span className="font-semibold text-lg">{answer}</span>
                  </button>
                ))}
              </div>

              <button
                className="w-full bg-primary text-white rounded-2xl py-5 font-bold text-xl shadow-xl shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-30"
                disabled={selectedAnswer === null || verifying}
                onClick={handleAnswer}
              >
                {verifying ? "Verifying..." : "Confirm Answer"}
              </button>
            </div>
          )}

          {/* 3. SUCCESS STATE */}
          {isCorrect && (
            <div className="flex flex-col items-center py-10 text-center space-y-6">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={60} />
              </div>
              <h2 className="text-4xl font-bold text-primary">Perfect Score!</h2>
              <p className="text-xl text-secondary font-bold">+{score} Points Added to Account</p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-md italic text-slate-600">
                "{currentQuestion?.question}"
              </div>
              <button
                className="w-full max-w-xs bg-primary py-4 text-white rounded-2xl font-bold text-lg hover:bg-primary/90 transition-colors"
                onClick={handleFinish}
              >
                Collect Rewards
              </button>
            </div>
          )}

          {/* 4. FAILED / TIME UP STATE */}
          {(isWrong || timeUp) && (
            <div className="flex flex-col items-center py-10 text-center space-y-6">
              <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={60} />
              </div>
              <h2 className="text-4xl font-bold text-primary">{timeUp ? "Out of Time" : "Nice Try!"}</h2>
              <p className="text-slate-500 max-w-xs">That was a tough one. Your daily challenge is now complete. Come back tomorrow for another chance.</p>
              
              <button
                className="w-full max-w-xs bg-slate-100 py-4 text-primary rounded-2xl font-bold text-lg hover:bg-slate-200 transition-colors"
                onClick={handleFinish}
              >
                Return to Challenges
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default InterviewQuestChallengeModal;