import { GiftIcon } from "lucide-react";

import { ChallengeCard } from "@/components/modules/challenge-card";
import { WeeklyChallengerBanner } from "@/components/modules/weekly-challenge-banner";

const ChallengesPage = () => {
  const challenges = [
    {
      type: "challenge" as "challenge", // Explicitly cast type
      title: "Interview Quest",
      description: "Complete a mock interview challenge",
      points: "50 points",
      progress: 60,
      currentValue: "3",
      maxValue: "5",
      badge: "Sponsored",
      theme: "#9747FF", // purple
      actionText: "Play Now",
    },
    {
      type: "reward" as "reward", // Explicitly cast type
      title: "MTN data dash",
      description: "Earn points with free airtime/data",
      points: "50 games Played",
      progress: 80,
      badge: "Core",
      theme: "#F8C75E", // purple
      actionText: "Play Now",
    },
    {
      type: "challenge" as "challenge", // Explicitly cast type
      title: "Skill Quest",
      description: "Learn to trade digital skill",
      points: "50 games Played",
      progress: 70,
      badge: "Core",
      theme: "#18F172", // purple
      actionText: "Play Now",
    },
    {
      type: "reward" as "reward", // Explicitly cast type
      title: "Savings Quest",
      description: "Basic financial literacy",
      points: "50 games Played",
      theme: "#203ED8", // purple
      progress: 90,
      badge: "Core",
      actionText: "Play Now",
    },
  ];

  return (
    <>
      <div className="relative mb-12 p-6 px-3 py-12">
        <div className="flex justify-center items-center gap-2 mb-6 text-secondary">
          <GiftIcon />
          <p>1 Month free access</p>
        </div>
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary">
            Your Skill Will Make Room for You.
          </h1>
          <p className="opacity-80">
            Step into MAG World — Africa&apos;s home of skill-based tournaments
            where talent finds its stage.
          </p>
        </div>
      </div>

      <div className="container relative mx-auto overflow-hidden">
        <div className="absolute top-[-10px]">
          <img alt="" src="/images/asset-2.png" />
        </div>

        <div className="max-w-6xl px-4 mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {challenges.map((challenge, index) => (
              <ChallengeCard
                key={index}
                badge={challenge.badge}
                buttonText="Play Now"
                currentValue={challenge.currentValue}
                description={challenge.description}
                maxValue={challenge.maxValue}
                points={challenge.points}
                progress={challenge.progress}
                theme={challenge.theme}
                title={challenge.title}
                type={challenge.type}
                // actionText={challenge.actionText}
              />
            ))}
          </div>

          <WeeklyChallengerBanner />
        </div>
      </div>
    </>
  );
};

export default ChallengesPage;
