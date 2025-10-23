import { WinLineBanner } from "@/components/modules/win-line-banner";
import Leaderboard from "@/components/shared/leaderboard";
import { Tabs, Tab } from "@heroui/tabs";

const LeaderboardPage = () => {
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
    <div className="relative mt-[8%]">
      <div className="size-[200px] bg-background flex justify-center items-center rounded-full absolute -bottom-20 -right-10">
        <img src="/images/asset-2.png" alt="" />
      </div>

      <div className="flex w-full py-12 flex-col">
        <Tabs
          aria-label="Options"
          size="lg"
          className="mx-auto"
          color="primary"
          radius="full"
        >
          <Tab key="xp" title="Xp Point">
            <div className="bg-[#F1F1F1] mt-6 p-4 md:p-12 rounded-xl">
              <div className="my-10">
                <WinLineBanner />
              </div>
              <Leaderboard data={leaderboardData} />
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
                          src="/images/bronze.svg"
                          alt="bronze badge"
                          className="w-16 h-16"
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
                          src="/images/silver.svg"
                          alt="silver badge"
                          className="w-16 h-16"
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
                          src="/images/gold.svg"
                          alt="gold badge"
                          className="w-16 h-16"
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
        <img src="/images/asset-1.png" alt="" />
      </div>
    </div>
  );
};

export default LeaderboardPage;
