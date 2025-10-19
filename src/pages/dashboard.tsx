import { GiftIcon } from "lucide-react";
import { ChallengeCard } from "@/components/modules/challenge-card";
import { WeeklyChallengerBanner } from "@/components/modules/weekly-challenge-banner";
import { WinLineBanner } from "@/components/modules/win-line-banner";
import { Card, CardBody } from "@heroui/card";

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
    <div className="container mx-auto p-6 px-3 py-12">
      <div className="relative mb-12">
        <div className="w-full absolute left-[10%]  flex justify-space-between">
          <img src="/images/asset-1.png" alt="" />
        </div>
        <div className="absolute right-[10%] top-[40%] ">
          <img src="/images/asset-2.png" alt="" />
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

      <div className="max-w-6xl mx-auto space-y-6">
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

        {/* leaderboard */}
        <div className="">
          <div className="lg:col-span-1">
            <Card className="">
              <CardBody className="p-6">
                <div className="bg-white dark:bg-gray-950 rounded-2xl p-4 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Rank
                        </th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Names
                        </th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Points
                        </th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Wins
                        </th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Loses
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.map((player, index) => (
                        <tr
                          key={player.rank}
                          className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        >
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white w-6 text-center">
                                {index > 3 ? (
                                  index + 1
                                ) : (
                                  <>
                                    {index == 0 && "🏆"}
                                    {index == 1 && "🥈"}
                                    {index == 2 && "🥉"}
                                  </>
                                )}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <span
                              className={`text-sm font-medium ${
                                index < 3
                                  ? index === 0
                                    ? "text-yellow-600 dark:text-yellow-400"
                                    : index === 1
                                      ? "text-blue-600 dark:text-blue-400"
                                      : "text-orange-600 dark:text-orange-400"
                                  : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {player.name}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span
                              className={`text-sm font-semibold ${
                                index < 3
                                  ? "text-yellow-600 dark:text-yellow-400"
                                  : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {player.points}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {player.wins}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {player.losses}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
