import { Tabs, Tab } from "@heroui/tabs";

import { WinLineBanner } from "@/components/modules/win-line-banner";
import Leaderboard from "@/components/shared/leaderboard";

const LeaderboardPage = () => {
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
