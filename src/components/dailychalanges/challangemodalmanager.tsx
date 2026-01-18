import { useState } from "react";
import { GiftIcon, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ChallengeCard } from "@/components/modules/challenge-card";
import InterviewQuestChallengeModal from "./games/interview_quest"; // Adjusted path based on your prompt

const ChallengeManager = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleStartChallenge = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Hero Section - Mirrored from ChallengesPage */}
      <div className="relative mb-12 p-6 px-3 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 flex items-center gap-2 text-primary opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="flex justify-center items-center gap-2 mb-6 text-secondary">
          <GiftIcon size={20} />
          <p className="font-medium">Daily Reward Active</p>
        </div>
        
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Daily Interview <span className="text-[#E69A17]">Quest</span>
          </h1>
          <p className="opacity-80 max-w-lg mx-auto">
            Test your knowledge, earn points, and win a daily prize. 
            You only get one shot every 24 hours. Make it count.
          </p>
        </div>
      </div>

      <div className="container relative mx-auto overflow-hidden">
        {/* Background Decorative Asset - Same as ChallengesPage */}
        <div className="absolute top-[-10px] opacity-50">
          <img alt="" src="/images/asset-2.png" />
        </div>

        <div className="max-w-4xl px-4 mx-auto">
          <div className="grid grid-cols-1 gap-6 mb-10 justify-items-center">
            {/* Main Action Card */}
          
                <ChallengeCard
                    description="One question to prove your expertise. Earn up to 10 points instantly."
                    currentValue="0"
                    maxValue="1"
                    points="Start Attempt"
                    progress={0}
                    theme="#E69A17"
                    title="Today's Challenge"
                    type="challenge"
                    onClick={handleStartChallenge}
                />
          

            {/* Hint / Info Area */}
            <div className="mt-8 text-center bg-secondary/10 p-6 rounded-2xl border border-secondary/20 w-full max-w-xl">
                <h3 className="text-secondary font-bold mb-2">Rules of Engagement</h3>
                <ul className="text-sm opacity-70 space-y-2">
                    <li>• You have a limited time to answer.</li>
                    <li>• Incorrect answers cannot be retried for points.</li>
                    <li>• Rewards are added to your profile immediately.</li>
                </ul>
            </div>
          </div>
        </div>
      </div>

      {/* The Modal Pop-up */}
      {showModal && (
        <InterviewQuestChallengeModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ChallengeManager;