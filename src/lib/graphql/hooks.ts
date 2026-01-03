import type {
  GetUserResponse,
  LoginResponse,
  SignupResponse,
  LoginUserInput,
  CreateNewUserInput,
  SetupProfileInput,
  SetupProfileResponse,
  GetGameResultsInput,
  GetGameResultsResponse,
  GetGamerResultInput,
  GetGamerResultResponse,
  GetGameSettingResponse,
  GetGameSoundsResponse,
  GetGameLevelInfoResponse,
  GameResultUpdate,
  UpdateGameResultResponse,
  GetGamersCurrentResultResponse,
  GetGamersCurrentPassedResultResponse,
  ResetPasswordInput,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  AddInterviewQuestInput,
  AddInterviewQuestResponse,
  GetInterviewQuestsInput,
  GetInterviewQuestsResponse,
  GetInterviewQuestResponse,
  VerifyAnswerInput,
  VerifyAnswerResponse,
  GetWalletResponse,
} from "./types";

import { useMutation, useQuery, useLazyQuery } from "@apollo/client/react";
import Cookies from "js-cookie";

import {
  GET_USER,
  GET_GAME_RESULTS,
  GET_GAMER_RESULT,
  GET_GAME_SETTING,
  GET_GAME_SOUNDS,
  GET_GAME_LEVEL_INFORMATION,
  GET_GAMERS_CURRENT_RESULT,
  GET_GAMERS_CURRENT_PASSED_RESULT,
  GET_INTERVIEW_QUESTS,
  GET_INTERVIEW_QUEST,
  VERIFY_INTERVIEW_QUEST_ANSWER,
  VERIFY_AND_SCORE_RANDOM_QUIZ_ANSWER,
  GET_WALLET,
} from "./queries";
import {
  LOGIN_USER,
  CREATE_USER,
  SETUP_PROFILE,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  ADD_INTERVIEW_QUEST,
} from "./mutations";

export const useGetUser = (id: string) => {
  return useQuery<GetUserResponse>(GET_USER, {
    variables: { id },
    skip: !id,
  });
};

export const useLogin = () => {
  const [loginMutation, { data, loading, error }] =
    useMutation<LoginResponse>(LOGIN_USER);

  const login = async (loginUserInput: LoginUserInput) => {
    const result = await loginMutation({
      variables: { loginUserInput },
    });

    if (result.data?.loginUser?.accessToken) {
      Cookies.set("accessToken", result.data.loginUser.accessToken);
      Cookies.set("refreshToken", result.data.loginUser.refreshToken);
    }

    return result;
  };

  return { login, data, loading, error };
};

export const useSignup = () => {
  const [signupMutation, { data, loading, error }] =
    useMutation<SignupResponse>(CREATE_USER);

  const signup = async (CreateNewUserInput: CreateNewUserInput) => {
    const result = await signupMutation({
      variables: { CreateNewUserInput },
    });

    if (result.data?.createUser?.accessToken) {
      Cookies.set("accessToken", result.data.createUser.accessToken);
      Cookies.set("refreshToken", result.data.createUser.refreshToken);
    }

    return result;
  };

  return { signup, data, loading, error };
};

export const useSetupProfile = () => {
  const [setupProfileMutation, { data, loading, error }] =
    useMutation<SetupProfileResponse>(SETUP_PROFILE);

  const setupProfile = async (setUpProfileInput: SetupProfileInput) => {
    const result = await setupProfileMutation({
      variables: { setUpProfileInput },
    });

    return result;
  };

  return { setupProfile, data, loading, error };
};

export const useGetGameResults = (input: GetGameResultsInput = {}) => {
  return useQuery<GetGameResultsResponse>(GET_GAME_RESULTS, {
    variables: { input: input || {} },
    errorPolicy: "all",
  });
};

export const useGetGamerResult = (input: GetGamerResultInput = {}) => {
  const result = useQuery<GetGamerResultResponse>(GET_GAMER_RESULT, {
    variables: { input: input || {} },
    errorPolicy: "all",
  });

  // Log the results
  if (result.data) {
    console.log("GetGamerResult data:", result.data);
  }

  return result;
};

export const useGetGameSetting = (type: string) => {
  return useQuery<GetGameSettingResponse>(GET_GAME_SETTING, {
    variables: { type },
    skip: !type,
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });
};

export const useGetGameSounds = (type: string) => {
  return useQuery<GetGameSoundsResponse>(GET_GAME_SOUNDS, {
    variables: { type },
    skip: !type,
  });
};

export const useGetGameLevelInformation = (level: number, type: string) => {
  return useQuery<GetGameLevelInfoResponse>(GET_GAME_LEVEL_INFORMATION, {
    variables: { input: { level, type } },
    skip: !type || !level,
  });
};

// Removed client-side gamer result mutation; server-side verification now handles scoring

export const useGetGamersCurrentResult = (type: string) => {
  return useQuery<GetGamersCurrentResultResponse>(GET_GAMERS_CURRENT_RESULT, {
    variables: { type },
    skip: !type,
  });
};

export const useGetGamersCurrentPassedResult = (type: string) => {
  return useQuery<GetGamersCurrentPassedResultResponse>(
    GET_GAMERS_CURRENT_PASSED_RESULT,
    {
      variables: { type },
      skip: !type,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    }
  );
};

export const useForgotPassword = () => {
  const [forgotPasswordMutation, { data, loading, error }] =
    useMutation<ForgotPasswordResponse>(FORGOT_PASSWORD);

  const forgotPassword = async (identifier: string) => {
    const result = await forgotPasswordMutation({
      variables: { forgotPasswordInput: { identifier } },
    });

    return result;
  };

  return { forgotPassword, data, loading, error };
};

export const useResetPassword = () => {
  const [resetPasswordMutation, { data, loading, error }] =
    useMutation<ResetPasswordResponse>(RESET_PASSWORD);

  const resetPassword = async (resetPasswordInput: ResetPasswordInput) => {
    const result = await resetPasswordMutation({
      variables: { resetPasswordInput },
    });

    return result;
  };

  return { resetPassword, data, loading, error };
};

export const useAddInterviewQuest = () => {
  const [addInterviewQuestMutation, { data, loading, error }] =
    useMutation<AddInterviewQuestResponse>(ADD_INTERVIEW_QUEST);

  const addInterviewQuest = async (input: AddInterviewQuestInput) => {
    const result = await addInterviewQuestMutation({
      variables: { input },
    });

    return result;
  };

  return { addInterviewQuest, data, loading, error };
};

export const useGetInterviewQuests = (input: GetInterviewQuestsInput = {}) => {
  return useQuery<GetInterviewQuestsResponse>(GET_INTERVIEW_QUESTS, {
    variables: { input },
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });
};

export const useGetInterviewQuest = () => {
  return useLazyQuery<GetInterviewQuestResponse>(GET_INTERVIEW_QUEST, {
    fetchPolicy: "network-only",
  });
};

export const useVerifyAnswer = () => {
  // Prefer the newer VerifyAndScoreRandomQuizAnswer; fallback exists via server routing
  const [verifyAnswerQuery, { data, loading, error }] =
    useLazyQuery<VerifyAnswerResponse>(VERIFY_AND_SCORE_RANDOM_QUIZ_ANSWER);

  const verifyAnswer = async (input: VerifyAnswerInput) => {
    try {
      const result = await verifyAnswerQuery({
        variables: { input },
      });
      return result;
    } catch (err) {
      throw err;
    }
  };

  return { verifyAnswer, data, loading, error };
};

export const useGetWallet = (walletId?: string | null) => {
  return useQuery<GetWalletResponse>(GET_WALLET, {
    variables: { walletId: walletId || null },
  });
};

// Re-export useChallenges hook
export { useChallenges } from "./hooks/use-challenges";
export type { ChallengeData, GameType } from "./hooks/use-challenges";
