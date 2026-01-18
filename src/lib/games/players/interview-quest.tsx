import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import type { InterviewQuest } from "@/lib/graphql/types";
import {
  useGetInterviewQuest,
  useVerifyAnswer,
  useGetGameLevelInformation,
  useGetGamersCurrentPassedResult,
  useGetGameResults,
  usePickRandomQuizWinnerToday,
  useVerifyInterviewQuestAnswer,
} from "@/lib/graphql";
import { useAuth } from "@/lib/auth-context";

import Header from "../components/header";
import Loader, { LoaderRef } from "../components/loader";

const InterviewQuest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromChallenge = searchParams.get("fromChallenge") === "true";
  const [loading, setLoading] = useState(true);
  const ref = useRef<LoaderRef>(null);
  const [started, setStarted] = useState(false);
  const [blockedToday, setBlockedToday] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuest | null>(
    null
  );
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelInfo, setLevelInfo] = useState<any>(null);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [getQuestionLoading, setGetQuestionLoading] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Persisted user points
  const { user } = useAuth();
  const username = user?.username;
  const {
    data: myData,
    loading: myLoading,
  } = useGetGameResults(username ? { username } : {});
  const myPoints = myData?.getGameResults?.[0]?.point || 0;

  const { data: winnerData, loading: winnerLoading } = usePickRandomQuizWinnerToday();
  const winnerUsername = winnerData?.pickRandomQuizWinnerToday?.user?.username || null;

  // Get current passed level to determine starting level
  const { data: passedResultData } = useGetGamersCurrentPassedResult(
    "interviewquest"
  );

  // Get level information
  const { data: levelInfoData, loading: levelInfoLoading } =
    useGetGameLevelInformation(currentLevel, "interviewquest");

  // Lazy query for getting a random question
  const [getQuestion, { loading: questionLoading }] = useGetInterviewQuest();

  // Verify answer hook
  const { verifyAnswer, loading: verifying } = useVerifyInterviewQuestAnswer();

  // Removed client-side update of gamer result; server-side verification handles scoring

  // Initialize level from passed result
  useEffect(() => {
    if (passedResultData?.getGamersCurrentPassedResult) {
      const passedLevel = passedResultData.getGamersCurrentPassedResult.level;
      setCurrentLevel(passedLevel + 1); // Start at next level
    }
  }, [passedResultData]);

  // Daily play restriction: block if already played today (only when from challenge)
  useEffect(() => {
    if (!fromChallenge) {
      // Regular interview quest can be played multiple times
      setBlockedToday(false);
      return;
    }
    
    // Challenge mode: only once per day
    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10); // YYYY-MM-DD
    const gameKey = `mag:played:interviewquest:challenge:${username || "guest"}:${todayKey}`;
    const played = localStorage.getItem(gameKey);
    setBlockedToday(!!played);
  }, [username, fromChallenge]);

  // Update level info when it changes
  useEffect(() => {
    if (levelInfoData?.getGameLevelInformation) {
      const info = levelInfoData.getGameLevelInformation;
      setLevelInfo(info);
      setTimeLimit(info.time || null);
      setTotalScore(info.perclick || 10); // Single question per game
    }
  }, [levelInfoData]);

  // Timer effect
  useEffect(() => {
    if (started && startTime && timeLimit && !timeUp) {
      timerIntervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);

        if (elapsed >= timeLimit) {
          // Time's up
          setTimeUp(true);
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          handleTimeUp();
        }
      }, 1000);

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
      };
    }
  }, [started, startTime, timeLimit, timeUp]);

  // Initial loader
  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.start(() => {
        setLoading(false);
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  // Fetch a new random question
  const fetchQuestion = async () => {
    try {
      setGetQuestionLoading(true)
      const input: any = {
        level: currentLevel.toString(),
      };

      const result = await getQuestion({
        variables: { input },
      });

      if (result.data?.GetInterviewQuest) {
        setCurrentQuestion(result.data.GetInterviewQuest);
        setStartTime(Date.now());
        setElapsedTime(0);
        setSelectedAnswer(null);
        setIsCorrect(false);
        setIsWrong(false);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }finally{
      setGetQuestionLoading(false)
    }
  };

  const handleTimeUp = async () => {
    // Stop timer and prevent further interactions
    setTimeUp(true);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    // Mark as completed without client-side mutation
    setGameCompleted(true);
  };

  const handleAnswer = async () => {
    if (selectedAnswer === null || !currentQuestion || timeUp) return;

    let answerText: string;

    // Handle multiple choice or text answer
    if (currentQuestion.options && currentQuestion.options.length > 0) {
      answerText = currentQuestion.options[selectedAnswer];
    } else {
      // For text-based answers, you'd need an input field
      // For now, we'll use the selected option index
      return;
    }

    try {
      const result = await verifyAnswer({
        id: currentQuestion.id,
        answer: answerText,
      });

      const verification =
        (result.data as any)?.VerifyInterviewquestAnswerAndScore;
        // ||
        // (result.data as any)?.VerifyInterviewquestAnswer;

      if (verification) {
        const { correct } = verification;

        if (correct) {
          setScore(score + (levelInfo?.perclick || 10));
          setIsCorrect(true);
          setQuestionsAnswered(questionsAnswered + 1);
        } else {
          setIsWrong(true);
        }

        // After answering, no client-side mutation or auto-complete
        // User can press Finish or Retry
      }
    } catch (error) {
      console.error("Error verifying answer:", error);
      setIsWrong(true);
    }
  };

  // Removed submitResults mutation flow; server-side verification handles scoring

  const handleStart = async () => {
    if (blockedToday) return;
    setStarted(true);
    setScore(0);
    setQuestionsAnswered(0);
    setGameCompleted(false);
    setTimeUp(false);
    setElapsedTime(0);

    // Mark played today (only for challenge mode)
    if (fromChallenge) {
      const todayKey = new Date().toISOString().slice(0, 10);
      const gameKey = `mag:played:interviewquest:challenge:${username || "guest"}:${todayKey}`;
      localStorage.setItem(gameKey, "1");
    }
    await fetchQuestion();
  };
// useEffect(()=>{
//   if(isCorrect){
//     const timeout = setTimeout(() => {  
//       handleStart()
//     }, 100);
//     return () => clearTimeout(timeout);
//   }
// })
  const handleRetry = () => {
    setIsWrong(false);
    setSelectedAnswer(null);
  };

  const handleFinish = () => {
    navigate("/games");
  };

  if (loading && !started) {
    return <Loader ref={ref} imageUrl="/images/games/interview-quest.jpg" />;
  }

  if (levelInfoLoading && !levelInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <p className="text-white">Loading level information...</p>
      </div>
    );
  }

  if (questionLoading && !currentQuestion && started) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <p className="text-white">Loading question...</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full min-h-full bg-cover bg-center"
      style={{
        height: !started ? "100%" : "auto",
        overflowY: !started ? "hidden" : "auto",
        background:
          "radial-gradient(circle at center, rgba(30, 58, 138, 0.9) 0%, rgba(15, 23, 42, 1) 100%)",
      }}
    >
      <Header />

      {!started && (
        <div className="min-h-full h-full relative py-8">
          <div className="pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-20" />
            <div className="absolute bottom-20 left-16 w-16 h-16 bg-white rounded-full opacity-20" />
            <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full opacity-20" />
            <div className="absolute bottom-16 right-12 w-24 h-24 bg-white rounded-full opacity-20" />
          </div>
          <div className="flex flex-col items-center justify-center h-full px-4 w-full gap-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#E69A17] mb-4 uppercase tracking-wide">
                INTERVIEW QUEST
              </h1>
              <p className="text-white text-lg md:text-xl mb-2">Master The Questions.</p>
              <p className="text-white text-lg md:text-xl">Unlock Your Future</p>
              {levelInfo && (
                <div className="mt-4 text-white/70">
                  <p>Level {currentLevel}</p>
                  {timeLimit && <p>Time Limit: {timeLimit}s</p>}
                  <p>Pass Threshold: {levelInfo.pass || 50}%</p>
                  {!winnerLoading && winnerUsername && (
                    <p className="mt-2">Today's Winner: {winnerUsername}</p>
                  )}
                  {blockedToday && (
                    <p className="mt-2 text-red-300">You've already played today. Come back tomorrow.</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-6 md:gap-8">
              <img alt="Icon 1" src="/images/games/interview-Icon.png" />
            </div>

            <div className="text-center">
              <button
                className="cursor-pointer"
                disabled={levelInfoLoading || blockedToday}
                onClick={handleStart}
              >
                <img alt="Play" className="w-36" src="/images/games/Interview-play.png" />
              </button>
              {blockedToday && (
                <div className="mt-4">
                  {/* <button
                    className="text-white font-medium text-base md:text-lg hover:opacity-90 transition-opacity py-2"
                    onClick={() => navigate("/games")}
                  >
                    Return to Games
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {started && !isCorrect && !isWrong && !timeUp && currentQuestion && (
        <div className="min-h-full flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
          <div className="flex-1 bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col min-h-[300px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#E69A17] text-2xl md:text-3xl font-bold uppercase">
                INTERVIEW QUEST
              </h2>
              <div className="text-white text-sm md:text-base space-y-1">
                <p>Level {currentLevel}</p>
                {timeLimit && (
                  <p>
                    Time: {timeUp ? 0 : Math.max(0, (timeLimit || 0) - elapsedTime)}s
                  </p>
                )}
                <p>Points: {myLoading ? "..." : myPoints.toFixed(2)}</p>
                {!winnerLoading && winnerUsername && <p>Winner: {winnerUsername}</p>}
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              <p className="text-white text-lg md:text-xl lg:text-2xl text-center">
                {currentQuestion.question}
              </p>
            </div>
            {currentQuestion.hint && (
              <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  💡 Hint: {currentQuestion.hint}
                </p>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-4 md:gap-6 min-h-[300px]">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              Answer
            </h3>

            {currentQuestion.options && currentQuestion.options.length > 0 ? (
              <div className="flex flex-col gap-3 md:gap-4 flex-1">
                {currentQuestion.options.map((answer, index) => {
                  const answerColors = [
                    "#8B5CF6",
                    "#60A5FA",
                    "#E69A17",
                    "#8B5CF6",
                  ];

                  return (
                    <button
                      key={index}
                      className={`w-full rounded-xl md:rounded-2xl p-4 md:p-5 text-left text-white font-medium text-base md:text-lg transition-all ${
                        selectedAnswer === index
                          ? "ring-4 ring-white ring-offset-2 ring-offset-gray-900"
                          : "hover:opacity-90"
                      }`}
                      style={{
                        backgroundColor: answerColors[index % answerColors.length],
                      }}
                      onClick={() => {
                        if (!timeUp) {
                          setSelectedAnswer(index);
                        }
                      }}
                      disabled={timeUp}
                    >
                      <span className="font-bold mr-2">
                        {String(index + 1).padStart(2, "0")}:
                      </span>
                      {answer}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1">
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white p-4 rounded-lg"
                  placeholder="Type your answer..."
                  onChange={() => {
                    // Handle text input answer
                    // You might want to store this differently
                  }}
                />
              </div>
            )}

            <button
              className="w-full bg-gray-900 border-2 border-white rounded-xl md:rounded-2xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedAnswer === null || verifying || timeUp}
              onClick={handleAnswer}
            >
              {verifying ? "Verifying..." : "Confirm"}
            </button>
          </div>
        </div>
      )}

      {started && isCorrect && currentQuestion && (
        <div className="min-h-full flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
          <div className="flex-1 bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col min-h-[300px]">
            <div className="flex flex-col items-center mb-6">
              <img
                alt="Correct"
                className="w-28 h-28 mb-4 object-contain"
                src="/images/games/check.png"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Correct!
              </h2>
              <h3 className="text-[#E69A17] text-xl md:text-2xl font-bold uppercase">
                +{levelInfo?.perclick || 10} Points
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              <p className="text-white text-lg md:text-xl lg:text-2xl text-center">
                {currentQuestion.question}
              </p>
            </div>
            <button
              className="w-full bg-[red] mb-2 rounded-xl md:rounded-2xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity mt-auto"
              onClick={handleFinish}
            >
              Finish
            </button>
            <button
            disabled={getQuestionLoading}
              className="w-full bg-[#27C840] rounded-xl md:rounded-2xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity mt-auto"
              onClick={handleStart}
            >
            {getQuestionLoading ? "Loading..." : "Next Question"}
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-4 md:gap-6 min-h-[300px]">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              Answer
            </h3>
            <div className="flex flex-col gap-3 md:gap-4 flex-1">
              {currentQuestion.options?.map((answer, index) => {
                const answerColors = [
                  "#8B5CF6",
                  "#60A5FA",
                  "#E69A17",
                  "#8B5CF6",
                ];
                const isSelected = selectedAnswer === index;

                return (
                  <button
                    key={index}
                    className={`w-full rounded-xl md:rounded-2xl p-4 md:p-5 text-left text-white font-medium text-base md:text-lg transition-all ${
                      isSelected ? "ring-4 ring-green-500" : ""
                    }`}
                    style={{
                      backgroundColor: answerColors[index % answerColors.length],
                      opacity: isSelected ? 1 : 0.5,
                    }}
                  >
                    <span className="font-bold mr-2">
                      {String(index + 1).padStart(2, "0")}:
                    </span>
                    {answer}
                    {isSelected && (
                      <span className="ml-2 text-green-300">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
            <button
              disabled
              className="w-full bg-gray-900 border-2 border-white rounded-xl md:rounded-2xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {started && timeUp && currentQuestion && (
        <div className="min-h-full flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
          <div className="flex-1 bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col min-h-[300px]">
            <div className="flex flex-col items-center mb-6">
              <img
                alt="Time Up"
                className="w-28 h-28 mb-4 object-contain"
                src="/images/games/time.png"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Time's Up!
              </h2>
              <h3 className="text-[#E69A17] text-xl md:text-2xl font-bold uppercase">
                INTERVIEW QUEST
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              <p className="text-white text-lg md:text-xl lg:text-2xl text-center">
                {currentQuestion.question}
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-auto">
              <button
                className="w-full bg-[#27C840] rounded-xl md:rounded-2xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                onClick={handleFinish}
              >
                Return to Games
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4 md:gap-6 min-h-[300px]">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              Answer
            </h3>
            <div className="flex flex-col gap-3 md:gap-4 flex-1">
              {currentQuestion.options?.map((answer, index) => {
                const answerColors = [
                  "#8B5CF6",
                  "#60A5FA",
                  "#E69A17",
                  "#8B5CF6",
                ];

                return (
                  <button
                    key={index}
                    className="w-full rounded-xl md:rounded-2xl p-4 md:p-5 text-left text-white font-medium text-base md:text-lg transition-all opacity-50"
                    style={{
                      backgroundColor: answerColors[index % answerColors.length],
                    }}
                    disabled
                  >
                    <span className="font-bold mr-2">
                      {String(index + 1).padStart(2, "0")}:
                    </span>
                    {answer}
                  </button>
                );
              })}
            </div>
            <button
              disabled
              className="w-full bg-gray-900 border-2 border-white rounded-xl md:rounded-2xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Time's Up
            </button>
          </div>
        </div>
      )}

      {started && isWrong && !timeUp && currentQuestion && (
        <div className="min-h-full flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
          <div className="flex-1 bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col min-h-[300px]">
            <div className="flex flex-col items-center mb-6">
              <img
                alt="Wrong Answer"
                className="w-28 h-28 mb-4 object-contain"
                src="/images/games/cancel.png"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Wrong Answer
              </h2>
              <h3 className="text-[#E69A17] text-xl md:text-2xl font-bold uppercase">
                INTERVIEW QUEST
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              <p className="text-white text-lg md:text-xl lg:text-2xl text-center">
                {currentQuestion.question}
              </p>
            </div>
            {/* Intentionally not displaying the correct answer when user fails */}
            <div className="flex flex-col gap-2 mt-auto">
              <button
                className="w-full bg-[#27C840] rounded-xl md:rounded-2xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                onClick={handleRetry}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Try again
              </button>
              <button
                className="w-full text-white font-medium text-base md:text-lg hover:opacity-90 transition-opacity py-2"
                onClick={handleFinish}
              >
                Home
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4 md:gap-6 min-h-[300px]">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              Answer
            </h3>
            <div className="flex flex-col gap-3 md:gap-4 flex-1">
              {currentQuestion.options?.map((answer, index) => {
                const answerColors = [
                  "#8B5CF6",
                  "#60A5FA",
                  "#E69A17",
                  "#8B5CF6",
                ];
                const isSelected = selectedAnswer === index;

                return (
                  <button
                    key={index}
                    className={`w-full rounded-xl md:rounded-2xl p-4 md:p-5 text-left text-white font-medium text-base md:text-lg transition-all ${
                      isSelected ? "ring-4 ring-red-500" : ""
                    }`}
                    style={{
                      backgroundColor: answerColors[index % answerColors.length],
                      opacity: isSelected ? 0.8 : 0.5,
                    }}
                  >
                    <span className="font-bold mr-2">
                      {String(index + 1).padStart(2, "0")}:
                    </span>
                    {answer}
                  </button>
                );
              })}
            </div>
            <button
              disabled
              className="w-full bg-gray-900 border-2 border-white rounded-xl md:rounded-2xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {gameCompleted && !timeUp && !isCorrect && !isWrong && (
        <div className="min-h-full flex items-center justify-center p-4 md:p-6">
          <div className="bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-2xl w-full">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Level {currentLevel} Complete!
              </h2>
              <p className="text-white/70 text-lg mb-6">
                Final Score: {score}/{totalScore}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  className="bg-[#27C840] rounded-xl py-3 px-6 text-white font-bold text-lg hover:opacity-90 transition-opacity"
                  onClick={handleFinish}
                >
                  Return to Games
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewQuest;
