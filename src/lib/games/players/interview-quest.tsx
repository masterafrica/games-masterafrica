import { useEffect, useRef, useState } from "react";

import Loader, { LoaderRef } from "../components/loader";
import Header from "../components/header";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}

const InterviewQuest = () => {
  const [loading, setLoading] = useState(true);
  const ref = useRef<LoaderRef>(null);
  const [started, setStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [score, setScore] = useState(0);

  const questions: Question[] = [
    {
      question:
        "A customer says the shirt you sewed is too tight. What do you do?",
      answers: [
        "Politely apologize and offer to adjust it quickly",
        "Tell the customer it's their fault for not providing correct measurements",
        "Ignore the complaint and move on",
        "Offer a refund without asking questions",
      ],
      correctAnswer: 0,
    },
    {
      question: "How do you handle a difficult client during a consultation?",
      answers: [
        "Listen actively and show empathy to understand their concerns",
        "Interrupt them to show you know better",
        "Ignore their concerns and proceed with your plan",
        "Tell them they're being unreasonable",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "What's the best way to manage your time when working on multiple orders?",
      answers: [
        "Prioritize tasks and create a schedule",
        "Work on everything at once",
        "Ignore deadlines and work at your own pace",
        "Only accept one order at a time",
      ],
      correctAnswer: 0,
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.start(() => {
        setLoading(false);
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading && !started) {
    return <Loader ref={ref} imageUrl="/images/games/interview-quest.jpg" />;
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

          {/* Right Panel - Answers */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6 min-h-[300px]">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              Answer
            </h3>

            <div className="flex flex-col gap-3 md:gap-4 flex-1">
              {currentQuestion.answers.map((answer, index) => {
                const answerColors = [
                  "#8B5CF6", // Purple
                  "#60A5FA", // Light blue
                  "#E69A17", // Orange/gold
                  "#8B5CF6", // Purple
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
                      backgroundColor: answerColors[index],
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
              disabled={selectedAnswer === null}
              onClick={() => {
                if (selectedAnswer !== null) {
                  if (selectedAnswer === currentQuestion.correctAnswer) {
                    setScore(score + 1);
                    setIsCorrect(true);
                  } else {
                    setIsWrong(true);
                  }
                }
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {started && isCorrect && (
        <div className="relative w-full min-h-full flex flex-col items-center justify-center p-4 md:p-8 py-8">
          <div className="w-full max-w-xl bg-[#F9B20E] border-4 border-white rounded-3xl md:rounded-[40px] p-6 md:p-10 mb-6 md:mb-8">
            <h2 className="text-3xl md:text-2xl lg:text-4xl font-bold text-white text-center mb-4 md:mb-6 uppercase tracking-wide">
              CORRECT
            </h2>

            <div className="">
              <img
                alt="Correct"
                className="w-full md:w-1/2 mx-auto my-3 h-full object-contain"
                src="/images/games/correct.png"
              />
              <p className="text-white text-center text-md md:text-xl font-extralight">
                Nice one - you earned +50 coin
              </p>
            </div>
          </div>

          <div className="w-full max-w-md flex flex-col gap-2">
            <button
              className="w-full bg-[#27C840] rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
              onClick={() => {
                if (currentQuestionIndex < questions.length - 1) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                  setSelectedAnswer(null);
                  setIsCorrect(false);
                } else {
                  setStarted(false);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswer(null);
                  setIsCorrect(false);
                  setScore(0);
                }
              }}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
            </button>
            <button
              className="w-full bg-black rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
              onClick={() => {
                setIsCorrect(false);
              }}
            >
              Review
            </button>
          </div>
        </div>
      )}

      {started && isWrong && (
        <div className="relative w-full min-h-full flex flex-col items-center justify-center p-4 md:p-8 py-8">
          <div className="w-full max-w-xl bg-[#F9B20E] border-4 border-white rounded-3xl md:rounded-[40px] p-6 md:p-10 mb-6 md:mb-8">
            <h2 className="text-3xl md:text-2xl lg:text-4xl font-bold text-white text-center mb-4 md:mb-6 uppercase tracking-wide">
              Almost
            </h2>

            <div className="">
              <p className="text-white text-center text-md md:text-xl font-extralight">
                The correct answer is hidden try again or use hint
              </p>
              <img
                alt="Wrong"
                className="w-[100px] mx-auto my-3 h-full object-contain"
                src="/images/games/wrong.png"
              />
            </div>
          </div>

          <div className="w-full max-w-md flex flex-col gap-2">
            <button
              className="w-full bg-[#27C840] rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
              onClick={() => {
                setSelectedAnswer(null);
                setIsWrong(false);
              }}
            >
              Try Again
            </button>
            <button
              className="w-full bg-black rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
              onClick={() => {
                setSelectedAnswer(null);
                setIsWrong(false);
              }}
            >
              Use Hint
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewQuest;
