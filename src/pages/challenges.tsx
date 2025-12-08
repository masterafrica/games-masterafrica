import { GiftIcon } from "lucide-react";
import Lottie from "lottie-react";

import { ChallengeCard } from "@/components/modules/challenge-card";
import { WeeklyChallengerBanner } from "@/components/modules/weekly-challenge-banner";
import { useChallenges } from "@/lib/graphql/hooks/use-challenges";
import loadingAnimation from "@/assets/lotties/loading.json";

const ChallengesPage = () => {
  const { challenges, isLoading, hasError } = useChallenges();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Lottie
            loop
            animationData={loadingAnimation}
            style={{ width: 200, height: 200 }}
          />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Loading challenges...
          </p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading challenges</p>
          <p className="text-gray-600 dark:text-gray-400">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

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
          {challenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.gameType}
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
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No challenges available at the moment
              </p>
            </div>
          )}

          <WeeklyChallengerBanner />
        </div>
      </div>
    </>
  );
};

export default ChallengesPage;
