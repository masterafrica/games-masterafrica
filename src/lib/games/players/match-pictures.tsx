import { useEffect, useRef, useState } from "react";

import Button from "../components/button";
import Loader, { LoaderRef } from "../components/loader";
import Header from "../components/header";

interface Card {
  id: number;
  image: string;
  matched: boolean;
  flipped: boolean;
}

const MatchPictures = () => {
  const [loading, setLoading] = useState(true);
  const ref = useRef<LoaderRef>(null);
  const [started, setStarted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState(0);

  const images = [
    "/images/games/samples/1.png",
    "/images/games/samples/2.png",
    "/images/games/samples/3.png",
    "/images/games/samples/1.png",
    "/images/games/samples/2.png",
    "/images/games/samples/3.png",
  ];

  const [cards, setCards] = useState<Card[]>(() => {
    const shuffled = [...images]
      .map((img, idx) => ({
        id: idx,
        image: img,
        matched: false,
        flipped: false,
      }))
      .sort(() => Math.random() - 0.5);

    return shuffled;
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.start(() => {
        setLoading(false);
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleCardClick = (index: number) => {
    if (
      cards[index].flipped ||
      cards[index].matched ||
      flippedCards.length === 2
    ) {
      return;
    }

    const newCards = [...cards];

    newCards[index].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];

    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);

      const [first, second] = newFlipped;

      if (cards[first].image === cards[second].image) {
        setTimeout(() => {
          const updatedCards = [...newCards];

          updatedCards[first].matched = true;
          updatedCards[second].matched = true;
          setCards(updatedCards);
          setMatchedPairs(matchedPairs + 1);
          setFlippedCards([]);

          if (matchedPairs + 1 === images.length / 2) {
            setIsCorrect(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const updatedCards = [...newCards];

          updatedCards[first].flipped = false;
          updatedCards[second].flipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const shuffled = [...images]
      .map((img, idx) => ({
        id: idx,
        image: img,
        matched: false,
        flipped: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setIsCorrect(false);
  };

  if (loading && !started) {
    return <Loader ref={ref} imageUrl="/images/games/match-picture.jpg" />;
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
              Match Pictures
            </h2>
            <Button
              backgroundColor="#4B4EFC"
              stroke="white"
              strokeWidth={3}
              text="Play"
              onClick={() => {
                setStarted(true);
                resetGame();
              }}
            />
          </div>
        </div>
      )}

      {started && !isCorrect && (
        <>
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

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 lg:gap-10 mt-4 md:mt-7 p-4 md:p-6 lg:p-10 pb-24 md:pb-6">
            <div className="hidden md:block flex-shrink-0">
              <button className="cursor-pointer">
                <img
                  alt="Wait"
                  className="w-auto h-auto object-contain"
                  src="/images/games/wait.png"
                />
              </button>
            </div>

            <div className="w-full flex-1 max-w-4xl mx-auto md:mx-0 px-2 md:px-4 z-10">
              <div className="mb-4 md:mb-6">
                <h3 className="text-[#FF7101] text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl pb-2 md:pb-4 font-bold">
                  Match the Pictures
                </h3>
                <div className="flex justify-center gap-4 text-white text-sm md:text-base">
                  <span>Moves: {moves}</span>
                  <span>
                    Pairs: {matchedPairs}/{images.length / 2}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                {cards.map((card, index) => (
                  <button
                    key={index}
                    className={`relative aspect-square rounded-xl md:rounded-2xl overflow-hidden transition-all ${
                      card.flipped || card.matched
                        ? "opacity-100"
                        : "opacity-80 hover:opacity-100"
                    } ${card.matched ? "ring-4 ring-green-400" : ""}`}
                    disabled={card.matched || card.flipped}
                    onClick={() => handleCardClick(index)}
                  >
                    {card.flipped || card.matched ? (
                      <img
                        alt={`Card ${index}`}
                        className="w-full h-full object-cover"
                        src={card.image}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <span className="text-white text-2xl md:text-4xl font-bold">
                          ?
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

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
                Great job! You matched all pairs in {moves} moves
              </p>
            </div>
          </div>

          <div className="w-full max-w-md flex flex-col gap-4">
            <button
              className="w-full bg-[#27C840] rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
              onClick={() => {
                resetGame();
              }}
            >
              Play Again
            </button>
            <button
              className="w-full bg-black rounded-2xl md:rounded-3xl py-4 md:py-5 text-white font-bold text-lg md:text-xl hover:opacity-90 transition-opacity"
              onClick={() => {
                setStarted(false);
                resetGame();
              }}
            >
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchPictures;
