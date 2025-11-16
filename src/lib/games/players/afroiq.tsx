import { useEffect, useRef, useState } from "react";

import Button from "../components/button";
import Loader, { LoaderRef } from "../components/loader";
import Header from "../components/header";

const Afroiq = () => {
  const [loading, setLoading] = useState(true);
  const ref = useRef<LoaderRef>(null);
  const [started, setStarted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.start(() => {
        setLoading(false);
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading && !started) {
    return <Loader ref={ref} imageUrl="/images/games/afro-iq.jpg" />;
  }

  return (
    <div
      className="relative w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/games/bgs/bg-1.png)",
      }}
    >
      <Header />

      {!started && (
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
      )}

      {started && !isCorrect && !isWrong && (
        <>
          {/* Mobile: Fixed position buttons - bottom right */}
          <div className="fixed bottom-6 right-4 z-20 flex flex-col gap-3 md:hidden">
            <button className="cursor-pointer">
              <img
                alt="Wait"
                className="w-14 h-14 object-contain"
                src="/images/games/wait.png"
              />
            </button>
            <button className="cursor-pointer">
              <img
                alt="Hints"
                className="w-14 h-14 object-contain"
                src="/images/games/hint.png"
              />
            </button>
          </div>

          {/* Main content */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 lg:gap-10 mt-4 md:mt-7 p-4 md:p-6 lg:p-10 pb-24 md:pb-6">
            {/* Desktop: Left button */}
            <div className="hidden md:block flex-shrink-0">
              <button className="cursor-pointer">
                <img
                  alt="Wait"
                  className="w-auto h-auto object-contain"
                  src="/images/games/wait.png"
                />
              </button>
            </div>

            {/* Main game content */}
            <div className="w-full flex-1 max-w-2xl mx-auto md:mx-0 px-2 md:px-4 z-10">
              <div className="">
                <h3 className="text-[#FF7101] text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl pb-4 md:pb-7 font-bold">
                  Guess the Puzzle
                </h3>
              </div>
              <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 lg:gap-6">
                  <div className="flex-1 flex items-center justify-center">
                    <img
                      alt="Puzzle piece 1"
                      className="w-full max-w-[100px] sm:max-w-[120px] h-auto object-contain"
                      src="/images/games/samples/1.png"
                    />
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <img
                      alt="Puzzle piece 2"
                      className="w-full max-w-[100px] sm:max-w-[120px] h-auto object-contain"
                      src="/images/games/samples/2.png"
                    />
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <img
                      alt="Puzzle piece 3"
                      className="w-full max-w-[100px] sm:max-w-[120px] h-auto object-contain"
                      src="/images/games/samples/3.png"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-3 md:mb-4">
                  <input
                    className="w-full bg-gray-700 text-white rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-base md:text-lg font-semibold placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Input answer"
                    style={{
                      backgroundColor: "#4A4A4A",
                    }}
                    type="text"
                  />
                </div>

                <button
                  className="p-2.5 md:p-3 w-full bg-[#27C840] rounded-xl md:rounded-2xl text-base md:text-lg border-[3px] text-white border-white font-semibold"
                  onClick={() => {
                    setIsWrong(true);
                  }}
                >
                  Send
                </button>
              </div>
            </div>

            {/* Desktop: Right button */}
            <div className="hidden md:block flex-shrink-0">
              <button className="cursor-pointer">
                <img
                  alt="Hints"
                  className="w-auto h-auto object-contain"
                  src="/images/games/hint.png"
                />
              </button>
            </div>
          </div>
        </>
      )}

      {started && isCorrect && (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
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

          <div className="w-full max-w-md flex flex-col gap-4">
            <button
              className="w-full bg-[#27C840] rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
              onClick={() => {
                setIsCorrect(false);
              }}
            >
              Next
            </button>
            <button
              className="w-full bg-black rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
              onClick={() => {
                setIsCorrect(false);
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {started && isWrong && (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
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
                setIsWrong(false);
              }}
            >
              Try Again
            </button>
            <button
              className="w-full bg-black rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
              onClick={() => {
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

export default Afroiq;
