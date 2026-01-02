import { GiftIcon } from "lucide-react";

import { ChallengeCard } from "@/components/modules/challenge-card";
import { WeeklyChallengerBanner } from "@/components/modules/weekly-challenge-banner";

const ChallengesPage = () => {
  // Hardcoded challenges listing (static)

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
            <ChallengeCard
              description="Compete daily to win real life reward"
              currentValue="0"
              maxValue="0"
              points="Coming soon"
              progress={0}
              theme="#9747FF"
              title="Daily Challenges"
              type="challenge"
            />

            <ChallengeCard
              // buttonText="Check out"
              description="Check out reward achieved from last wek"
              currentValue="0"
              maxValue="0"
              points="Coming soon"
              progress={0}
              theme="#FFD06A"
              title="Reward"
              type="reward"
            />
          </div>

          <WeeklyChallengerBanner />
        </div>
      </div>
    </>
  );
};

export default ChallengesPage;
