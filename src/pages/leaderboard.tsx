import { Tabs, Tab } from "@heroui/tabs";

import { WinLineBanner } from "@/components/modules/win-line-banner";
import { WinLineBannerWithShare } from "@/components/modules/win-line-banner-with-share";
import Leaderboard from "@/components/shared/leaderboard";
import { useGetGameResults, usePickRandomQuizWinnerToday } from "@/lib/graphql";
import { useAuth } from "@/lib/auth-context";

const LeaderboardPage = () => {
  const { user } = useAuth();
  const username = user?.username;

  // Global leaderboard
  const { data, loading } = useGetGameResults();
  // User-specific points
  const {
    data: myData,
    loading: myLoading,
  } = useGetGameResults(username ? { username } : {});

  // Today's quiz winner
  const { data: winnerData, loading: winnerLoading } = usePickRandomQuizWinnerToday();
  const winner = (winnerData as any)?.pickRandomQuizWinnerToday;

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
      name: result.user.firstName && result.user.lastName
        ? `${result.user.firstName} ${result.user.lastName}`
        : result.user.username,
      username: result.user.username || "Player",
      location: "Nigeria",
      xp: result.point,
      title: getTitleFromPoints(result.point),
    })) || [];

  return (
    <div className="relative md:mt-[1%]">
      <div className="size-[200px] bg-background flex justify-center items-center rounded-full absolute -bottom-20 -left-10 md:opacity-100 opacity-50">
        <img alt="" src="/images/asset-2.png" />
      </div>

      <div className="flex w-full py-12 flex-col">
        <Tabs
          aria-label="Options"
          className="mx-auto"
          color="primary"
          radius="full"
          size="lg"
        >
          <Tab key="xp" title="Xp Point">
            <div className="bg-[#F1F1F1] mt-6 p-4 md:p-12 rounded-xl">
              <div className="my-10">
                <WinLineBanner />
              </div>
              {!winnerLoading && winner ? (
                <div className="mb-6 bg-white rounded-xl p-4 md:p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Today's Quiz Winner</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {winner?.user?.username || "Winner"}
                      </p>
                    </div>
                    <div />
                  </div>
                </div>
              ) : null}
              {!myLoading && myData?.getGameResults?.length ? (
                <div className="mb-6">
                  <WinLineBannerWithShare
                    playerName={user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : (user?.username || "Player")}
                    points={myData.getGameResults[0].point}
                    title="Your Points"
                    showShare={true}
                  />
                </div>
              ) : null}
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
            </div>
          </Tab>
          <Tab key="invites" title="Invites">
            <div className="bg-[#F1F1F1] mt-6 p-4 md:p-12  rounded-xl">
              <div className="my-10">
                <WinLineBanner />
              </div>
              <div className="mb-8">
                <div className="bg-white rounded-xl p-6">
                  <div className="max-w-3xl">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Progress
                    </h3>
                    <p className="text-xs text-gray-500">
                      Referral progressive bar
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-600 mt-4">
                      <span>50 points</span>
                      <span>50/100</span>
                    </div>

                    <div className="w-full bg-white rounded-full h-3 overflow-hidden mt-2 border border-gray-100">
                      <div
                        className="h-3 bg-primary rounded-full"
                        style={{ width: "50%" }}
                      />
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                      <div className="flex items-center gap-4">
                        <img
                          alt="bronze badge"
                          className="w-16 h-16"
                          src="/images/bronze.svg"
                        />
                        <div>
                          <div className="text-primary font-semibold">
                            10 Invites
                          </div>
                          <div className="text-sm text-gray-500">
                            Bronze referrer badge + exclusive puzzle
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <img
                          alt="silver badge"
                          className="w-16 h-16"
                          src="/images/silver.svg"
                        />
                        <div>
                          <div className="text-primary font-semibold">
                            25 invites
                          </div>
                          <div className="text-sm text-gray-500">
                            Silver referrer badge + Profile highlight
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <img
                          alt="gold badge"
                          className="w-16 h-16"
                          src="/images/gold.svg"
                        />
                        <div>
                          <div className="text-primary font-semibold">
                            50 invites
                          </div>
                          <div className="text-sm text-gray-500">
                            Gold referrer badge + weekly leaderboard
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Leaderboard data={leaderboardData} />
            </div>
          </Tab>
        </Tabs>
      </div>

      <div className="size-[200px] bg-background  -z-10 justify-center items-center rounded-full absolute -top-20 -left-20 md:flex hidden">
        <img alt="" src="/images/asset-1.png" />
      </div>
    </div>
  );
};

export default LeaderboardPage;
