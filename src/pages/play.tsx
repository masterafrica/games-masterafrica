import { Button } from "@heroui/button";

import { GameCard, GameTheme } from "@/components/modules/game-card";
import { GameCanvas } from "@/lib/games";
import { useParams } from "react-router-dom";

const games = [
  {
    id: 1,
    title: "Interview Quest",
    description: "Sharpening the mind",
    image: "/images/games/interview-quest.jpg",
    theme: "yellow",
    offset: "none",
  },
  {
    id: 2,
    title: "Afro IQ",
    description: "Sharpening the mind",
    image: "/images/games/afro-iq.jpg",
    theme: "purple",
    offset: "sm",
  },
  {
    id: 3,
    title: "Match the picture",
    description: "Sharpening the mind",
    image: "/images/games/match-picture.jpg",
    theme: "blue",
    offset: "md",
  },
  {
    id: 4,
    title: "Afro IQ",
    description: "Sharpening the mind",
    image: "/images/games/unscramble-word.jpg",
    theme: "green",
    offset: "md",
  },
];

const PlayGame = () => {
  const { id } = useParams();

  if (!id) return <div>Game not found</div>;

  return (
    <div className="container grid px-4 gap-8 mx-auto m-2">
      <div className="">
        <Button color="primary">Referral Link</Button>
      </div>

      <GameCanvas gameId={id} />

      <div className="my-5">
        <div className="flex justify-evenly flex-wrap gap-5">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={{
                theme: game.theme as GameTheme,
                title: game.title,
                description: game.description,
                id: game.id,
                image: game.image,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayGame;
