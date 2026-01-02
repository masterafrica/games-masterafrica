import { Card, CardBody } from "@heroui/card";
import { ShareButton } from "./share-button";

interface Props {
  data: {
    rank: number;
    name: string;
    skillInterest: string;
    location: string;
    xp: number;
    title: string;
  }[];
}

const getRankBadgeColor = (rank: number) => {
  if (rank === 1) return "bg-yellow-500";
  if (rank === 2) return "bg-blue-500";
  if (rank === 3) return "bg-amber-800";
  return "bg-gray-300";
};

const getTitleIcon = (title: string) => {
  if (title === "Grand Master") {
    return (
      <span className="inline-flex items-center gap-1">
        <span className="text-yellow-500">🏆</span>
        <span>{title}</span>
      </span>
    );
  }
  if (title === "Master") {
    return (
      <span className="inline-flex items-center gap-1">
        <span className="text-yellow-500">⭐</span>
        <span>{title}</span>
      </span>
    );
  }
  if (title === "Champion") {
    return (
      <span className="inline-flex items-center gap-1">
        <span className="text-yellow-500">⭐</span>
        <span>{title}</span>
      </span>
    );
  }
  return <span>{title}</span>;
};

const Leaderboard = ({ data }: Props) => {
  return (
    <div>
      <div className="">
        <div className="lg:col-span-1">
          <Card className="">
            <CardBody className="p-1">
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-1 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Rank
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Player
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Skill Interest
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Location
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                        XP
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Titles
                      </th>
                      <th className="text-center py-3 px-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((player) => (
                      <tr
                        key={player.rank}
                        className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-semibold text-white w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(
                                player.rank
                              )}`}
                            >
                              {player.rank}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {player.name}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {player.skillInterest}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {player.location}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {Number(player.xp).toFixed(2)}XP
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {getTitleIcon(player.title)}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <ShareButton
                            playerName={player.name}
                            points={Math.round(player.xp)}
                            title="Master Africa Games"
                            rank={player.rank}
                            buttonSize="sm"
                            showLabel={false}
                          />
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
  );
};

export default Leaderboard;
