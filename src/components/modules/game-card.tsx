import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";

export type GameTheme = "yellow" | "purple" | "blue" | "green";

export type GameCardData = {
  id: number;
  title: string;
  description: string;
  image: string; // circular thumbnail
  theme: GameTheme;
};

function themeClasses(theme: GameTheme) {
  switch (theme) {
    case "yellow":
      return {
        card: "bg-amber-50 border-amber-200",
        wedge: "bg-amber-50",
        button: "bg-amber-400 text-amber-950 hover:bg-amber-500",
        ring: "ring-amber-300",
      };
    case "purple":
      return {
        card: "bg-violet-100 border-violet-200",
        wedge: "bg-violet-100",
        button: "bg-violet-600 text-white hover:bg-violet-700",
        ring: "ring-violet-300",
      };
    case "blue":
      return {
        card: "bg-sky-100 border-sky-200",
        wedge: "bg-sky-100",
        button: "bg-sky-500 text-white hover:bg-sky-600",
        ring: "ring-sky-300",
      };
    case "green":
      return {
        card: "bg-emerald-100 border-emerald-200",
        wedge: "bg-emerald-100",
        button: "bg-emerald-500 text-white hover:bg-emerald-600",
        ring: "ring-emerald-300",
      };
  }
}

export function GameCard({ game }: { game: GameCardData }) {
  const t = themeClasses(game.theme);
  return (
    <Card
      shadow="sm"
      className={`relative ${t.card} border rounded-2xl px-5 pb-6 pt-10 transition-shadow hover:shadow-md`}
    >
      {/* circular thumbnail overlapping the top-left */}
      <div className="">
        <img
          src={game.image}
          alt={game.title}
          className={`h-20 w-20 mx-auto rounded-full object-cover border-4 border-white shadow-sm ring-2 ${t.ring}`}
        />
      </div>

      {/* angled wedge on top-right */}
      <div
        aria-hidden
        className={`absolute right-0 top-0 h-24 w-12 ${t.wedge}`}
        style={{ clipPath: "polygon(0 0, 100% 16%, 100% 100%, 0 100%)" }}
      />

      <CardBody className="pt-2">
        <div className="text-center">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">
            {game.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-600">{game.description}</p>
        </div>

        <div className="mt-5 flex justify-center">
          <Button
            as={Link}
            to={`/games/${game.id}`}
            radius="full"
            className={`${t.button} font-semibold px-10`}
            variant="solid"
            size="sm"
          >
            Play
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
