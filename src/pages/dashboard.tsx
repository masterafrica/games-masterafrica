import { GiftIcon } from "lucide-react";

import { ChallengeCard } from "@/components/modules/challenge-card";
import { WeeklyChallengerBanner } from "@/components/modules/weekly-challenge-banner";
import { WinLineBanner } from "@/components/modules/win-line-banner";
import Leaderboard from "@/components/shared/leaderboard";

const DashboardPage = () => {
  const leaderboardData = [
    {
      rank: 1,
      name: "Chike Master",
      skillInterest: "Researcher",
      location: "Lagos",
      xp: 2000,
      title: "Grand Master",
    },
    {
      rank: 2,
      name: "Emmauel",
      skillInterest: "Brand Designer",
      location: "Anambra",
      xp: 1000,
      title: "Grand Master",
    },
    {
      rank: 3,
      name: "Prince",
      skillInterest: "Fashion Designer",
      location: "Porthacout",
      xp: 800,
      title: "Master",
    },
    {
      rank: 4,
      name: "Emaka",
      skillInterest: "Graphic Designer",
      location: "Ilorin",
      xp: 500,
      title: "Champion",
    },
    {
      rank: 5,
      name: "Bolu",
      skillInterest: "Data Analyst",
      location: "Benue",
      xp: 200,
      title: "Contender",
    },
    {
      rank: 6,
      name: "Bisola",
      skillInterest: "Dancer",
      location: "Lagos",
      xp: 100,
      title: "Contender",
    },
    {
      rank: 7,
      name: "Fredo",
      skillInterest: "Footballer",
      location: "Lagos",
      xp: 50,
      title: "Starter",
    },
    {
      rank: 8,
      name: "Charles",
      skillInterest: "Chief",
      location: "Calabar",
      xp: 20,
      title: "Starter",
    },
  ];

  return (
    <div className="container mx-auto overflow-hidden">
      <div className="relative mb-12 p-6 px-3 py-12">
        <div className="w-full opacity-50 md:opacity-100 absolute left-[-25%] md:left-[10%]  flex justify-space-between">
          <img alt="" src="/images/asset-1.png" width={120} />
        </div>
        <div className="absolute opacity-50 md:opacity-100 md:right-[10%] right-[-25%] top-[40%] ">
          <img alt="" src="/images/asset-2.png" width={120} />
        </div>
        <div className="flex justify-center items-center gap-2 mb-6 text-secondary">
          <GiftIcon />
          <p>1 Month free access</p>
          <span />
        </div>
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary">PLAY IS POWER</h1>
          <p className="opacity-80">
            Step into MAG World — Africa’s home of skill-based tournaments where
            talent finds its stage.
          </p>
        </div>
      </div>

      <div className="max-w-6xl px-4 mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChallengeCard
            currentValue="3"
            description="Compete daily to win real life reward"
            maxValue="5"
            points="50 points"
            progress={60}
            theme="#9747FF"
            title="Daily Challenges"
            type="challenge"
          />

          <ChallengeCard
            buttonText="Check out"
            description="Check out reward achieved from last wek"
            points="50 games Played"
            progress={80}
            theme="#FFD06A"
            title="Reward"
            type="reward"
          />
        </div>

        <div className="my-10">
          <WeeklyChallengerBanner />
        </div>

        <div className="my-10">
          <WinLineBanner />
        </div>

        <Leaderboard data={leaderboardData} />
        <div className="h-[20px]" />
      </div>
    </div>
  );
};

export default DashboardPage;
