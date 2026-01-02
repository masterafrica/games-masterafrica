import { Card, CardBody } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { Button } from "@heroui/button";

interface ChallengeCardProps {
  type: "challenge" | "reward";
  title: string;
  description: string;
  points: string;
  progress: number;
  currentValue?: string;
  maxValue?: string;
  buttonText?: string;
  badge?: string; // Added badge property
  theme?: string;
  playerName?: string;
  pointsValue?: number;
  showShare?: boolean;
}

export const ChallengeCard = ({
  type,
  title,
  description,
  points,
  progress,
  currentValue,
  maxValue,
  buttonText,
  badge,
  theme,
}: ChallengeCardProps) => {
  const baseColor = theme || "#9747FF";
  const bg = baseColor + "15";
  const border = baseColor + "30";

  return (
    <Card
      className={`backdrop-blur-sm dark:bg-gray-900 border dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow`}
      style={{
        backgroundColor: bg,
        border: `1px solid ${border}`,
      }}
    >
      <CardBody className="p-6 md:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {type === "reward" && <span className="text-xl">🎁</span>}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
            {badge && (
              <span
                className="text-xs text-white py-1 px-4 rounded-full font-semibold mt-3 block"
                style={{
                  backgroundColor: baseColor,
                  width: "min-content",
                }}
              >
                {badge}
              </span>
            )}
          </div>

          {buttonText && (
            <Button
              className="font-semibold border-none underline text-xs md:text-sm px-4 md:px-6"
              size="sm"
              style={{
                color: baseColor,
              }}
              variant="ghost"
            >
              {buttonText}
            </Button>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">{points}</span>
            {currentValue && maxValue && (
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentValue}/{maxValue}
              </span>
            )}
          </div>
          <Progress
            classNames={{
              base: "max-w-full",
              track: "bg-gray-200 dark:bg-gray-800 h-3",
              indicator: "bg-gradient-to-r from-yellow-400 to-orange-400",
            }}
            color="warning"
            size="md"
            value={progress}
          />
        </div>
      </CardBody>
    </Card>
  );
};
