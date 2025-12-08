import { GameCard } from "@/components/modules/game-card";
import { GAMES, type GameWithOffset } from "@/config/games";

const games = GAMES.filter((game) => game.id === 1);

function offsetClass(offset: NonNullable<GameWithOffset["offset"]>) {
  switch (offset) {
    case "sm":
      return "mt-6";
    case "md":
      return "mt-1";
    default:
      return "mt-0";
  }
}

export default function GamesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left hero */}
        <section className="lg:col-span-7">
          <div className="mb-6 text-sm text-gray-500">Master Africa Games</div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-purple-600">
            PLAY, WIN & MASTER
            <br />
            YOUR FUTURE
          </h1>
          <p className="mt-3 text-gray-600">
            The ultimate playground where talents come alive.
          </p>

          <div className="mt-10">
            <img
              alt="Master Africa Games mascot"
              className="max-h-[420px] w-auto select-none"
              src="/images/master-games-2.png"
            />
          </div>
        </section>

        {/* Right: select games + staggered cards */}
        <section className="lg:col-span-5">
          <div className="mb-4">
            <div className="text-xs text-gray-400">Master Africa Games</div>
            <div className="text-sm font-semibold text-gray-700">
              Select Games:
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
            {games.map((game) => (
              <div key={game.id} className={offsetClass(game.offset || "none")}>
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
