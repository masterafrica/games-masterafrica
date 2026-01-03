import { useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  useGetGameSetting,
  useGetGamersCurrentPassedResult,
  useGetGameResults,
} from "../hooks";

export const GAME_TYPES = [
  "crossword",
  "tooltidy",
  "afrolyrics",
  "sortify",
  "picturepuzzle",
  "afroiq",
  "interviewquest",
] as const;

export type GameType = (typeof GAME_TYPES)[number];

export const GAME_TYPE_INFO: Record<
  GameType,
  {
    title: string;
    description: string;
    theme: string;
    badge?: string;
    type: "challenge" | "reward";
  }
> = {
  crossword: {
    title: "Crossword Challenge",
    description: "Test your vocabulary and word skills",
    theme: "#9747FF",
    badge: "Core",
    type: "challenge",
  },
  tooltidy: {
    title: "Tool Tidy",
    description: "Organize and match tools efficiently",
    theme: "#F8C75E",
    badge: "Core",
    type: "challenge",
  },
  afrolyrics: {
    title: "Afro Lyrics",
    description: "Match lyrics and test your music knowledge",
    theme: "#18F172",
    badge: "Core",
    type: "challenge",
  },
  sortify: {
    title: "Sortify Challenge",
    description: "Sort and organize items correctly",
    theme: "#203ED8",
    badge: "Core",
    type: "challenge",
  },
  picturepuzzle: {
    title: "Picture Puzzle",
    description: "Match pictures and solve visual puzzles",
    theme: "#9747FF",
    badge: "Core",
    type: "challenge",
  },
  afroiq: {
    title: "Afro IQ",
    description: "Test your knowledge with African trivia",
    theme: "#F8C75E",
    badge: "Sponsored",
    type: "challenge",
  },
  interviewquest: {
    title: "Interview Quest",
    description: "Complete a mock interview challenge",
    theme: "#9747FF",
    badge: "Sponsored",
    type: "challenge",
  },
};

export interface ChallengeData {
  gameType: GameType;
  title: string;
  description: string;
  theme: string;
  badge?: string;
  type: "challenge" | "reward";
  points: string;
  progress: number;
  currentValue?: string;
  maxValue?: string;
  level?: number;
  perclick?: number;
  pass?: number;
  loading: boolean;
  error?: Error;
}

export const useChallenges = () => {
  const { user } = useAuth();
  const username = user?.username || undefined;
  const { data: gameResultsData, loading: pointsLoading } = useGetGameResults(
    username ? { username } : {}
  );

  // const crosswordSetting = useGetGameSetting("crossword");
  // const crosswordProgress = useGetGamersCurrentPassedResult("crossword");
  
  // const tooltidySetting = useGetGameSetting("tooltidy");
  // const tooltidyProgress = useGetGamersCurrentPassedResult("tooltidy");
  
  // const afrolyricsSetting = useGetGameSetting("afrolyrics");
  // const afrolyricsProgress = useGetGamersCurrentPassedResult("afrolyrics");
  
  // const sortifySetting = useGetGameSetting("sortify");
  // const sortifyProgress = useGetGamersCurrentPassedResult("sortify");
  
  // const picturepuzzleSetting = useGetGameSetting("picturepuzzle");
  // const picturepuzzleProgress = useGetGamersCurrentPassedResult("picturepuzzle");
  
  // const afroiqSetting = useGetGameSetting("afroiq");
  // const afroiqProgress = useGetGamersCurrentPassedResult("afroiq");
  
  const interviewquestSetting = useGetGameSetting("interviewquest");
  const interviewquestProgress = useGetGamersCurrentPassedResult("interviewquest");

  const queries = useMemo(
    () => [
      // {
      //   gameType: "crossword" as GameType,
      //   gameSetting: crosswordSetting,
      //   userProgress: crosswordProgress,
      // },
      // {
      //   gameType: "tooltidy" as GameType,
      //   gameSetting: tooltidySetting,
      //   userProgress: tooltidyProgress,
      // },
      // {
      //   gameType: "afrolyrics" as GameType,
      //   gameSetting: afrolyricsSetting,
      //   userProgress: afrolyricsProgress,
      // },
      // {
      //   gameType: "sortify" as GameType,
      //   gameSetting: sortifySetting,
      //   userProgress: sortifyProgress,
      // },
      // {
      //   gameType: "picturepuzzle" as GameType,
      //   gameSetting: picturepuzzleSetting,
      //   userProgress: picturepuzzleProgress,
      // },
      // {
      //   gameType: "afroiq" as GameType,
      //   gameSetting: afroiqSetting,
      //   userProgress: afroiqProgress,
      // },
      {
        gameType: "interviewquest" as GameType,
        gameSetting: interviewquestSetting,
        userProgress: interviewquestProgress,
      },
    ],
    [
      // crosswordSetting,
      // crosswordProgress,
      // tooltidySetting,
      // tooltidyProgress,
      // afrolyricsSetting,
      // afrolyricsProgress,
      // sortifySetting,
      // sortifyProgress,
      // picturepuzzleSetting,
      // picturepuzzleProgress,
      // afroiqSetting,
      // afroiqProgress,
      interviewquestSetting,
      interviewquestProgress,
    ]
  );

  const challenges = useMemo<ChallengeData[]>(() => {
    return queries
      .map(({ gameType, gameSetting, userProgress }) => {
        if (gameSetting.error) {
          return null;
        }

        if (!gameSetting.data?.getGameSetting) {
          if (!gameSetting.loading) {
            return null;
          }
          return {
            gameType,
            title: GAME_TYPE_INFO[gameType].title,
            description: GAME_TYPE_INFO[gameType].description,
            theme: GAME_TYPE_INFO[gameType].theme,
            badge: GAME_TYPE_INFO[gameType].badge,
            type: GAME_TYPE_INFO[gameType].type,
            points: "Loading...",
            progress: 0,
            level: 0,
            loading: true,
          } as ChallengeData;
        }

        const gameSettingData = gameSetting.data.getGameSetting;
        if (!gameSettingData || !gameSettingData.type) {
          return null;
        }

        const info = GAME_TYPE_INFO[gameType];
        const currentLevel = userProgress.data?.getGamersCurrentPassedResult?.level || 0;
        const perclick = gameSettingData.perclick || 0;
        const pass = gameSettingData.pass || 0;

        const maxLevels = 10;
        const progress = maxLevels > 0 ? Math.round((currentLevel / maxLevels) * 100) : 0;

        const points = perclick > 0 ? `${perclick} points per click` : "Earn points";

        return {
          gameType,
          title: info.title,
          description: info.description,
          theme: info.theme,
          badge: info.badge,
          type: info.type,
          points,
          progress: Math.min(progress, 100),
          currentValue: currentLevel > 0 ? currentLevel.toString() : undefined,
          maxValue: maxLevels.toString(),
          level: currentLevel,
          perclick,
          pass,
          loading: gameSetting.loading || userProgress.loading,
          error: userProgress.error,
        };
      })
      .filter((challenge): challenge is ChallengeData => challenge !== null);
  }, [queries]);

  const userTotalPoints = useMemo(() => {
    if (!gameResultsData?.getGameResults || gameResultsData.getGameResults.length === 0) {
      return 0;
    }
    return gameResultsData.getGameResults[0]?.point || 0;
  }, [gameResultsData]);

  const isLoading = challenges.some((challenge) => challenge.loading) || pointsLoading;
  const hasError = challenges.some((challenge) => challenge.error);

  return {
    challenges,
    userTotalPoints,
    isLoading,
    hasError,
  };
};

