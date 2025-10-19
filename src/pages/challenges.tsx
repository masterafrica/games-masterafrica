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
      actionText: "Play Now",
    },
    {
      type: "reward" as "reward", // Explicitly cast type
      title: "MTN data dash",
      description: "Earn points with free airtime/data",
      points: "50 games Played",
      progress: 80,
      badge: "Core",
      actionText: "Play Now",
    },
    {
      type: "challenge" as "challenge", // Explicitly cast type
      title: "Skill Quest",
      description: "Learn to trade digital skill",
      points: "50 games Played",
      progress: 70,
      badge: "Core",
      actionText: "Play Now",
    },
    {
      type: "reward" as "reward", // Explicitly cast type
      title: "Savings Quest",
      description: "Basic financial literacy",
      points: "50 games Played",
      progress: 90,
      badge: "Core",
      actionText: "Play Now",
    },
  ];

  return (
    <div className="container relative mx-auto p-6 px-3 py-12">
        <div className="absolute top-[-10px]">
            <img src="/images/asset-2.png" alt="" />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {challenges.map((challenge, index) => (
          <ChallengeCard
            key={index}
            type={challenge.type}
            title={challenge.title}
            description={challenge.description}
            points={challenge.points}
            progress={challenge.progress}
            currentValue={challenge.currentValue}
            maxValue={challenge.maxValue}
            badge={challenge.badge}
            // actionText={challenge.actionText}
          />
        ))}
      </div>

      <WeeklyChallengerBanner />
    </div>
  );
};

export default ChallengesPage;