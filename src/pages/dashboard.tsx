import { GiftIcon } from "lucide-react";
import { ChallengeCard } from "@/components/modules/challenge-card";
import { WeeklyChallengerBanner } from "@/components/modules/weekly-challenge-banner";
import { WinLineBanner } from "@/components/modules/win-line-banner";
import Leaderboard from "@/components/shared/leaderboard";

const DashboardPage = () => {
  const leaderboardData = [
    {
      rank: 1,
      name: "John Doe",
      points: 100,
      badge: "🏆",
      wins: 25,
      losses: 5,
    },
    {
      rank: 2,
      name: "Jane Smith",
      points: 90,
      badge: "🥈",
      wins: 20,
      losses: 10,
    },
    {
      rank: 3,
      name: "Alice Johnson",
      points: 80,
      badge: "🥉",
      wins: 15,
      losses: 12,
    },
  ];
  return (
    <div className="container mx-auto overflow-hidden">
      <div className="relative mb-12 p-6 px-3 py-12">
        <div className="w-full opacity-50 md:opacity-100 absolute left-[-25%] md:left-[10%]  flex justify-space-between">
          <img src="/images/asset-1.png" width={120} alt="" />
        </div>
        <div className="absolute opacity-50 md:opacity-100 md:right-[10%] right-[-25%] top-[40%] ">
          <img src="/images/asset-2.png" width={120} alt="" />
        </div>
        <div className="flex justify-center items-center gap-2 mb-6 text-secondary">
          <GiftIcon />
          <p>1 Month free access</p>
          <span></span>
        </div>
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary">
            Fun Games Brand Gamification
          </h1>
          <p className="opacity-80">
            Be sure to be part of master africa community were you engage with
            other friendly user{" "}
          </p>
        </div>
      </div>

      <div className="max-w-6xl px-4 mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChallengeCard
            type="challenge"
            title="Daily Challenges"
            description="Compete daily to win real life reward"
            points="50 points"
            progress={60}
            currentValue="3"
            maxValue="5"
          />

          <ChallengeCard
            type="reward"
            title="Reward"
            description="Check out reward achieved from last wek"
            points="50 games Played"
            progress={80}
            buttonText="Check out"
          />
        </div>

        <div className="my-10">
          <WeeklyChallengerBanner />
        </div>

        <div className="my-10">
          <WinLineBanner />
        </div>

        <Leaderboard data={leaderboardData} />
        <div className="h-[20px]"></div>
      </div>
    </div>
  );
};

export default DashboardPage;
