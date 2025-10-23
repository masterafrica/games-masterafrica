import { Card, CardBody } from "@heroui/card";

interface Props {
  data: {
    rank: number;
    name: string;
    points: number;
    wins: number;
    losses: number;
  }[];
}

const Leaderboard = ({ data }: Props) => {
  return (
    <div>
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
                    {data.map((player, index) => (
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
  );
};

export default Leaderboard;
