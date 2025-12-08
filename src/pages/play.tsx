import { Button } from "@heroui/button";

import { GameCard, GameTheme } from "@/components/modules/game-card";
import { GAMES } from "@/config/games";
import { GameCanvas } from "@/lib/games";
import { useParams } from "react-router-dom";

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
          {GAMES.map((game) => (
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
