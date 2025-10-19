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
}: ChallengeCardProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <CardBody className="p-6 md:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-1">
            {badge && (
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1 block">
                {badge}
              </span>
            )}
            <div className="flex items-center gap-2 mb-2">
              {type === "reward" && <span className="text-xl">🎁</span>}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
          {buttonText && (
            <Button 
              size="sm" 
              color="warning"
              variant="faded"
              className="font-semibold text-xs md:text-sm px-4 md:px-6"
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
            value={progress} 
            color="warning"
            size="md"
            classNames={{
              base: "max-w-full",
              track: "bg-gray-200 dark:bg-gray-800 h-2",
              indicator: "bg-gradient-to-r from-yellow-400 to-orange-400",
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
};
