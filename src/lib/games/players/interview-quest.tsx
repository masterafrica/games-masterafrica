import { useEffect, useRef, useState } from "react";

import type { InterviewQuest } from "@/lib/graphql/types";
import { useGetInterviewQuests, useVerifyAnswer } from "@/lib/graphql";

import Header from "../components/header";
import Loader, { LoaderRef } from "../components/loader";

const InterviewQuest = () => {
  const [loading, setLoading] = useState(true);
  const ref = useRef<LoaderRef>(null);
  const [started, setStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<InterviewQuest[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const {
    data: questionsData,
    loading: questionsLoading,
    error: questionsError,
  } = useGetInterviewQuests({
    page: 1,
    limit: 10,
  });

  const { verifyAnswer, loading: verifying } = useVerifyAnswer();

  useEffect(() => {
    if (questionsData?.GetInterviewQuests?.questions) {
      setQuestions(questionsData.GetInterviewQuests.questions);
    }
  }, [questionsData]);

  useEffect(() => {
    if (questionsError) {
      // eslint-disable-next-line no-console
      console.error("Error fetching interview questions:", questionsError);
    }
    if (questionsData) {
      // eslint-disable-next-line no-console
      console.log("Interview questions data:", questionsData);
    }
  }, [questionsError, questionsData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.start(() => {
        setLoading(false);
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleAnswer = async () => {
    if (selectedAnswer === null || !questions[currentQuestionIndex]) return;

    const currentQuestion = questions[currentQuestionIndex];
    const answerText = currentQuestion.options[selectedAnswer];

    try {
      const result = await verifyAnswer({
        questionId: currentQuestion.id,
        answer: answerText,
      });

      if (result.data?.VerifyAnswer) {
        const { correct, feedback: answerFeedback } = result.data.VerifyAnswer;
        setFeedback(answerFeedback || null);

        if (correct) {
          setScore(score + 1);
          setIsCorrect(true);
        } else {
          setIsWrong(true);
        }
      }
    } catch (error) {
      console.error("Error verifying answer:", error);
      setIsWrong(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(false);
      setIsWrong(false);
      setFeedback(null);
    } else {
      setStarted(false);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setIsCorrect(false);
      setIsWrong(false);
      setScore(0);
      setFeedback(null);
    }
  };

  if (loading && !started) {
    return <Loader ref={ref} imageUrl="/images/games/interview-quest.jpg" />;
  }

  if (questionsLoading && questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <p className="text-white">Loading questions...</p>
      </div>
    );
  }

  if (questionsError) {
    const apolloError = questionsError as any;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4">
        <p className="text-red-400 text-lg mb-2">Error loading questions</p>
        <p className="text-white/70 text-sm text-center mb-2">
          {questionsError.message || "Failed to fetch interview questions"}
        </p>
        {apolloError.networkError && (
          <p className="text-red-300 text-xs text-center mb-2">
            Network Error: {apolloError.networkError.message}
          </p>
        )}
        {apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0 && (
          <div className="text-red-300 text-xs text-center mb-2">
            {apolloError.graphQLErrors.map((err: any, idx: number) => (
              <p key={idx}>{err.message}</p>
            ))}
          </div>
        )}
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!questionsLoading && questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4">
        <p className="text-white text-lg mb-2">No questions available</p>
        <p className="text-white/70 text-sm text-center">
          {questionsData?.GetInterviewQuests
            ? "No questions found in the database"
            : "Failed to load questions"}
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

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
          <div className="flex flex-col items-center justify-between h-full px-4 w-full">
            <div className="flex-1">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#E69A17] mb-4 uppercase tracking-wide">
                  INTERVIEW QUEST
                </h1>
                <p className="text-white text-lg md:text-xl mb-2">
                  Master The Questions.
                </p>
                <p className="text-white text-lg md:text-xl">
                  Unlock Your Future
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 md:gap-8 mb-12">
                <img alt="Icon 1" src="/images/games/interview-Icon.png" />
              </div>
            </div>

            <div className="ml-auto">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setStarted(true);
                }}
              >
                <img
                  alt="Play"
                  className="w-36"
                  src="/images/games/Interview-play.png"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {started && !isCorrect && !isWrong && (
        <div className="min-h-full flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
          <div className="flex-1 bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col min-h-[300px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#E69A17] text-2xl md:text-3xl font-bold uppercase">
                INTERVIEW QUEST
              </h2>
              <p className="text-white text-sm md:text-base">
                Question {currentQuestionIndex + 1}/{questions.length}
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              <p className="text-white text-lg md:text-xl lg:text-2xl text-center">
                {currentQuestion.question}
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4 md:gap-6 min-h-[300px]">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              Answer
            </h3>

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
                      setSelectedAnswer(index);
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
              className="w-full bg-gray-900 border-2 border-white rounded-xl md:rounded-2xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedAnswer === null || verifying}
              onClick={handleAnswer}
            >
              {verifying ? "Verifying..." : "Confirm"}
            </button>
          </div>
        </div>
      )}

      {started && isCorrect && (
        <div className="min-h-full flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
          <div className="flex-1 bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col min-h-[300px]">
            <div className="flex flex-col items-center mb-6">
              <img
                alt="Correct"
                className="w-28 h-28 mb-4 object-contain"
                src="/images/games/check.png"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Correct
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
            {feedback && (
              <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <p className="text-green-300 text-sm text-center">{feedback}</p>
              </div>
            )}
            <button
              className="w-full bg-[#27C840] rounded-xl md:rounded-2xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity mt-auto"
              onClick={handleNext}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-4 md:gap-6 min-h-[300px]">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              Answer
            </h3>
            <div className="flex flex-col gap-3 md:gap-4 flex-1">
              {currentQuestion.options.map((answer, index) => {
                const answerColors = [
                  "#8B5CF6",
                  "#60A5FA",
                  "#E69A17",
                  "#8B5CF6",
                ];
                const isCorrectAnswer = index === currentQuestion.correctAnswer;
                const isSelected = selectedAnswer === index;

                return (
                  <button
                    key={index}
                    className={`w-full rounded-xl md:rounded-2xl p-4 md:p-5 text-left text-white font-medium text-base md:text-lg transition-all ${
                      isCorrectAnswer ? "ring-4 ring-green-500" : ""
                    }`}
                    style={{
                      backgroundColor: answerColors[index % answerColors.length],
                      opacity: isCorrectAnswer ? 1 : isSelected ? 0.7 : 0.5,
                    }}
                  >
                    <span className="font-bold mr-2">
                      {String(index + 1).padStart(2, "0")}:
                    </span>
                    {answer}
                    {isCorrectAnswer && (
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

      {started && isWrong && (
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
            {feedback && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-300 text-sm text-center">{feedback}</p>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-auto">
              <button
                className="w-full bg-[#27C840] rounded-xl md:rounded-2xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                onClick={() => {
                  setSelectedAnswer(null);
                  setIsWrong(false);
                  setFeedback(null);
                }}
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
                onClick={() => {
                  setStarted(false);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswer(null);
                  setIsWrong(false);
                  setScore(0);
                  setFeedback(null);
                }}
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
              {currentQuestion.options.map((answer, index) => {
                const answerColors = [
                  "#8B5CF6",
                  "#60A5FA",
                  "#E69A17",
                  "#8B5CF6",
                ];
                const isCorrectAnswer = index === currentQuestion.correctAnswer;
                const isSelected = selectedAnswer === index;

                return (
                  <button
                    key={index}
                    className={`w-full rounded-xl md:rounded-2xl p-4 md:p-5 text-left text-white font-medium text-base md:text-lg transition-all ${
                      isCorrectAnswer ? "ring-4 ring-green-500" : ""
                    }`}
                    style={{
                      backgroundColor: answerColors[index % answerColors.length],
                      opacity: isCorrectAnswer ? 1 : isSelected ? 0.7 : 0.5,
                    }}
                  >
                    <span className="font-bold mr-2">
                      {String(index + 1).padStart(2, "0")}:
                    </span>
                    {answer}
                    {isCorrectAnswer && (
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
    </div>
  );
};

export default InterviewQuest;
