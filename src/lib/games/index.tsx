import { useEffect, useState } from "react";

import InterviewQuest from "./players/interview-quest";

export const GameCanvas = ({ gameId: _gameId }: { gameId: string }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.85,
    height: window.innerHeight * 0.7,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth * 0.85,
        height: window.innerHeight * 0.7,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="w-full flex items-start justify-center bg-black mx-auto"
      style={{ minWidth: dimensions.width, minHeight: dimensions.height }}
    >
      {/* {_gameId === "1" && <Afroiq />} */}
      {_gameId === "2" && <InterviewQuest />}
      {/* {_gameId === "3" && <MatchPictures />} */}
    </div>
  );
};
