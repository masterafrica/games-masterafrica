import { GiftIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ChallengeCard } from "@/components/modules/challenge-card";
import { DailyWinnerPopup } from "@/components/modules/daily-winner-popup";
import { WeeklyChallengerBanner } from "@/components/modules/weekly-challenge-banner";
import { WinLineBanner } from "@/components/modules/win-line-banner";
import Leaderboard from "@/components/shared/leaderboard";
import { useGetGameResults, usePickRandomQuizWinnerToday } from "@/lib/graphql";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data, loading } = useGetGameResults();
  const { data: winnerData, loading: winnerLoading } = usePickRandomQuizWinnerToday();
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);

  const winnerUsername = winnerData?.pickRandomQuizWinnerToday?.user?.username || null;

  const handleDailyChallengeClick = () => {
    // Navigate to Interview Quest with challenge flag
    navigate("/games/2?fromChallenge=true");
  };

  // Show winner popup when data is fetched
  useEffect(() => {
    if (winnerData?.pickRandomQuizWinnerToday && !winnerLoading) {
      setShowWinnerPopup(true);
    }
  }, [winnerData, winnerLoading]);

  const getTitleFromPoints = (points: number) => {
    if (points >= 1500) return "Grand Master";
    if (points >= 1000) return "Master";
    if (points >= 500) return "Champion";
    if (points >= 100) return "Contender";
    return "Starter";
  };

  const leaderboardData =
    data?.getGameResults.map((result, index) => ({
      rank: index + 1,
      name:
        result.user.firstName && result.user.lastName
          ? `${result.user.firstName} ${result.user.lastName}`
          : result.user.username,
      username: result.user.username || "Player",
      location: "Nigeria",
      xp: result.point,
      title: getTitleFromPoints(result.point),
    })) || [];

  return (
    <div className="container mx-auto overflow-hidden">
      {/* Daily Winner Popup */}
      <DailyWinnerPopup
        winner={
          winnerUsername
            ? {
                username: winnerUsername,
                gameName: "Interview Quest",
              }
            : null
        }
        isOpen={showWinnerPopup}
        onClose={() => setShowWinnerPopup(false)}
      />

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
            description="Compete daily to win real life reward"
            currentValue="0"
            maxValue="0"
            points="Play now"
            progress={0}
            theme="#9747FF"
            title="Daily Challenges"
            type="challenge"
            onClick={handleDailyChallengeClick}
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

        <div className="my-10">
          <WeeklyChallengerBanner />
        </div>

        <div className="my-10">
          <WinLineBanner />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading leaderboard...</p>
          </div>
        ) : leaderboardData.length > 0 ? (
          <Leaderboard data={leaderboardData} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No leaderboard data available</p>
          </div>
        )}
        <div className="h-[20px]" />
      </div>
    </div>
  );
};

export default DashboardPage;
