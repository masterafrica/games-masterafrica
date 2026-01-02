import { ShareButton } from "@/components/shared/share-button";

interface WinBannerWithShareProps {
  playerName?: string;
  points?: number;
  title?: string;
  rank?: number;
  showShare?: boolean;
}

export const WinLineBannerWithShare = ({
  playerName = "Player",
  points = 0,
  title = "Master Africa",
  rank,
  showShare = true,
}: WinBannerWithShareProps) => {
  return (
    <div className="bg-gradient-to-r relative from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
      <div className="relative flex-shrink-0">
        <img
          alt="Master Africa"
          className="object-contain"
          src="/images/master-games.png"
          width={200}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          Win line 🎮{" "}
          <span className="text-purple-600 dark:text-purple-400">
            {title}
          </span>
        </h3>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4">
          This is the line up for outstanding game/challenge participation in
          {" " + title}
        </p>

        {points > 0 && (
          <>
            <div className="flex items-center gap-4 mb-4">
              {rank && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    #{rank}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Rank
                  </div>
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {points.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Points
                </div>
              </div>
            </div>

            {showShare && (
              <ShareButton
                playerName={playerName}
                points={points}
                title="Master Africa Games"
                rank={rank}
                gameTitle="Daily Challenge Win"
                buttonSize="sm"
                buttonVariant="solid"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
