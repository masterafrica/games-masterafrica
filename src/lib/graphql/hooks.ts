// graphql1

import type {
  GetUserResponse,
  LoginResponse,
  SignupResponse,
  LoginUserInput,
  CreateNewUserInput,
  SetupProfileInput,
  SetupProfileResponse,
  UpdateUserInput,
  UpdateUserResponse,
  GetGameResultsInput,
  GetGameResultsResponse,
  GetGamerResultInput,
  GetGamerResultResponse,
  GetGameSettingResponse,
  GetGameSoundsResponse,
  GetGameLevelInfoResponse,
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
  PickRandomQuizWinnerTodayResponse,
  
  GetSkillsResponse,
  VerifyOtpInput,
  User,
  AuthResponse,
  IAfroIq as _,
  GetAfroIqResponse,
  GetLoginStatsResponse,
  SignupGraphResponse,
  GetRecentSignUpUsersResponse,
  SocialPostSubmissionsResponse,
  SocialPostSubmissionsInput,
  GetSocialPostResponse,






    GetVotingSubmissionsResponse,
  // GetVotingSubmissionsInput,
  ToggleVoteInput,
  ToggleVoteResponse,
  // GetLeaderboardInput,
  GetLeaderboardResponse,
  // GetMySubmissionsInput,
  GetMySubmissionsResponse,
  // GetUserSubmissionsInput,
  GetUserSubmissionsResponse,
  // GetVotersInput,
  GetVotersResponse,
  SetQualifiedInput,
  SetQualifiedResponse,
  GetMyChallengeStatusResponse,
  GetChallengeStatsResponse,
  // GetSubmissionResponse,
  GetPublicSubmissionResponse,
  GetSubmissionVoteStatusResponse,
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
  VERIFY_AND_SCORE_RANDOM_QUIZ_ANSWER,
  PICK_RANDOM_QUIZ_WINNER_TODAY,
  GET_WALLET,
  VERIFY_INTERVIEW_QUEST_ANSWER,
  GETSKILLSQUERY,
  GET_AFROIQ,
  VERIFY_AFRO_IQ_ANSWER as _VERIFY_AFRO_IQ_ANSWER,
  VERIFY_AND_SCORE_AFRO_IQ_ANSWER,
  GET_LOGIN_STATS,
  GET_SIGNUP_GRAPH,
  GET_RECENT_SIGNUP_USERS,
  GET_SOCIAL_POST_SUBMISSIONS,


    GET_VOTING_SUBMISSIONS,
  GET_LEADERBOARD,
  GET_MY_SUBMISSIONS,
  GET_USER_SUBMISSIONS,
  GET_VOTERS,
  GET_MY_CHALLENGE_STATUS,
  GET_CHALLENGE_STATS,
  // GET_SUBMISSION,
  GET_PUBLIC_SUBMISSION,
  GET_SUBMISSION_VOTE_STATUS,
} from "./queries";
import {
  LOGIN_USER,
  CREATE_USER,
  SETUP_PROFILE,
  UPDATE_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  ADD_INTERVIEW_QUEST,
  VERIFY_OTP,
  RESENDOTPQUERY,
  SUBMISSION_MAG_SOCIAL_POST,


    TOGGLE_VOTE,
  SET_SUBMISSION_QUALIFIED,
} from "./mutations";

export const useGetUser = (id: string) => {
  return useQuery<GetUserResponse>(GET_USER, {
    variables: { id },
    skip: !id,
  });
};

export const useLogin = () => {
  const [loginMutation, { data, loading, error }] = useMutation<LoginResponse>(LOGIN_USER);

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

  const setupProfile = async (input: Partial<SetupProfileInput>) => {
    // Build the input object, filtering out empty optional fields
    // but always keeping required fields (firstName, lastName, heardPlatform)
    const setUpProfileInput: Record<string, string> = {};
    
    Object.entries(input).forEach(([key, value]) => {
      // Always include firstName, lastName, heardPlatform (required fields)
      if (key === "firstName" || key === "lastName" || key === "heardPlatform") {
        setUpProfileInput[key] = value || "";
      } else if (value !== null && value !== undefined && value !== "") {
        // Only include optional fields if they have values
        setUpProfileInput[key] = value;
      }
    });

    const result = await setupProfileMutation({
      variables: { setUpProfileInput },
    });

    return result;
  };

  return { setupProfile, data, loading, error };
};
export const useVerifyOtp = () => {

  const [verifyOtpMutation, { data, loading, error }] =
    useMutation<User>(VERIFY_OTP);

  const verifyOtp = async (input: Partial<VerifyOtpInput>) => {
    // Build the input object, filtering out empty optional fields
    // but always keeping required fields (firstName, lastName, heardPlatform)


    const result = await verifyOtpMutation({
      variables: { input },
    });

    return result;
  };

  return { verifyOtp, data, loading, error };
};
export const useResendOtp = () => {
  return useLazyQuery<AuthResponse>(RESENDOTPQUERY, {
    // variables: { input },
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });
  // const [resendOtpMutation, { data, loading, error }] =
  //   useMutation<User>(RESENDOTPQUERY);

  // const resendOtp = async (identifier: string) => {
  //   // Build the input object, filtering out empty optional fields
  //   // but always keeping required fields (firstName, lastName, heardPlatform)


  //   const result = await resendOtpMutation({
  //     variables: { identifier },
  //   });

  //   return result;
  // };

  // return { resendOtp, data, loading, error };
};

export const useUpdateUser = () => {
  const [updateUserMutation, { data, loading, error }] =
    useMutation<UpdateUserResponse>(UPDATE_USER);

  const updateUser = async (input: UpdateUserInput) => {
    const result = await updateUserMutation({
      variables: { updateUserInput: input },
    });

    return result;
  };

  return { updateUser, data, loading, error };
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
export const useSubmitSocialPost = () => {
  const [submitPostMutation, { data, loading, error }] =
    useMutation<SocialPostSubmissionsResponse>(SUBMISSION_MAG_SOCIAL_POST);

  const submitPost = async (input: SocialPostSubmissionsInput) => {
    const result = await submitPostMutation({
      variables: { input },
    });

    return result;
  };

  return { submitPost, data, loading, error };
};

export const useGetInterviewQuests = (input: GetInterviewQuestsInput = {}) => {
  return useQuery<GetInterviewQuestsResponse>(GET_INTERVIEW_QUESTS, {
    variables: { input },
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });
};
export const useGetSkills = () => {

  return useLazyQuery<GetSkillsResponse>(GETSKILLSQUERY, {
    // variables: { input },
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });
//   let getSkills = async (input: getSkillInput)=>{
// // useLazyQuery
//   }
//   const { mutateAsync, ...getSkillsResult } = useMutation(getSkills);

//   return { getSkills: mutateAsync, getSkillsResult };
  // return {getSkills}
};

export const useGetInterviewQuest = () => {
  return useLazyQuery<GetInterviewQuestResponse>(GET_INTERVIEW_QUEST, {
    fetchPolicy: "network-only",
  });
};
export const useGetAfroIq = () => {
  return useLazyQuery<GetAfroIqResponse>(GET_AFROIQ, {
    fetchPolicy: "network-only",
  });
};
export const useGetLoginStats = () => {
  return useLazyQuery<GetLoginStatsResponse>(GET_LOGIN_STATS, {
    fetchPolicy: "network-only",
  });
};
export const useGetSocialPostSubmissions = () => {
  return useLazyQuery<GetSocialPostResponse>(GET_SOCIAL_POST_SUBMISSIONS, {
    fetchPolicy: "network-only",
  });
};
export const useGetSignUpGraph = () => {
  return useLazyQuery<SignupGraphResponse>(GET_SIGNUP_GRAPH, {
    fetchPolicy: "network-only",
  });
};
export const useGetRecentSignUpUsers = () => {
  return useLazyQuery<GetRecentSignUpUsersResponse>(GET_RECENT_SIGNUP_USERS, {
    fetchPolicy: "network-only",
  });
};
// export const useGetSkills = () => {
//   return useLazyQuery<any>(GETSKILLSQUERY, {
//     fetchPolicy: "network-only",
//   });
// };

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
export const useVerifyInterviewQuestAnswer = () => {
  // Prefer the newer VerifyAndScoreRandomQuizAnswer; fallback exists via server routing
  const [verifyAnswerQuery, { data, loading, error }] =
    useLazyQuery<VerifyAnswerResponse>(VERIFY_INTERVIEW_QUEST_ANSWER);

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
export const useVerifyAfroIqAnswer = () => {
  // Prefer the newer VerifyAndScoreRandomQuizAnswer; fallback exists via server routing
  const [verifyAnswerQuery, { data, loading, error }] =
    // useLazyQuery<VerifyAnswerResponse>(VERIFY_AFRO_IQ_ANSWER);
    useLazyQuery<VerifyAnswerResponse>(VERIFY_AND_SCORE_AFRO_IQ_ANSWER);

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

export const usePickRandomQuizWinnerToday = () => {
  return useQuery<PickRandomQuizWinnerTodayResponse>(PICK_RANDOM_QUIZ_WINNER_TODAY, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
};

// Re-export useChallenges hook
export { useChallenges } from "./hooks/use-challenges";
export type { ChallengeData, GameType } from "./hooks/use-challenges";




// ── single submission page (shareable link)
// export const useGetSubmission = () => {
//   return useLazyQuery<GetSubmissionResponse>(GET_SUBMISSION, {
//     fetchPolicy: "network-only",
//   });
// };
























// ── user side: entries open for voting (+ "did I vote?")
export const useGetVotingSubmissions = () => {
  return useLazyQuery<GetVotingSubmissionsResponse>(GET_VOTING_SUBMISSIONS, {
    fetchPolicy: "network-only",
  });
};

// ── user + admin: weekly leaderboard
export const useGetLeaderboard = () => {
  return useLazyQuery<GetLeaderboardResponse>(GET_LEADERBOARD, {
    fetchPolicy: "network-only",
  });
};

// ── user side: my own submissions
export const useGetMySubmissions = () => {
  return useLazyQuery<GetMySubmissionsResponse>(GET_MY_SUBMISSIONS, {
    fetchPolicy: "network-only",
  });
};

// ── admin: one user's submissions
export const useGetUserSubmissions = () => {
  return useLazyQuery<GetUserSubmissionsResponse>(GET_USER_SUBMISSIONS, {
    fetchPolicy: "network-only",
  });
};

// ── admin: who voted for a user
export const useGetVoters = () => {
  return useLazyQuery<GetVotersResponse>(GET_VOTERS, {
    fetchPolicy: "network-only",
  });
};

// ── user dashboard: this week's status (submitted? can I still submit?)
export const useGetMyChallengeStatus = () => {
  return useLazyQuery<GetMyChallengeStatusResponse>(GET_MY_CHALLENGE_STATUS, {
    fetchPolicy: "network-only",
  });
};

// ── admin dashboard: this week's headline numbers
export const useGetChallengeStats = () => {
  return useLazyQuery<GetChallengeStatsResponse>(GET_CHALLENGE_STATS, {
    fetchPolicy: "network-only",
  });
};

// ── single submission page (shareable link): public, no login needed
export const useGetPublicSubmission = () => {
  return useLazyQuery<GetPublicSubmissionResponse>(GET_PUBLIC_SUBMISSION, {
    fetchPolicy: "network-only",
  });
};

// ── single submission page: only called when the visitor is logged in
export const useGetSubmissionVoteStatus = () => {
  return useLazyQuery<GetSubmissionVoteStatusResponse>(GET_SUBMISSION_VOTE_STATUS, {
    fetchPolicy: "network-only",
  });
};

// ── user side: vote / un-vote
export const useToggleVote = () => {
  const [toggleVoteMutation, { data, loading, error }] =
    useMutation<ToggleVoteResponse>(TOGGLE_VOTE);

  const toggleVote = async (input: ToggleVoteInput) => {
    const result = await toggleVoteMutation({ variables: { input } });
    return result;
  };

  return { toggleVote, data, loading, error };
};

// ── admin: mark an entry qualified / unqualified
export const useSetSubmissionQualified = () => {
  const [setQualifiedMutation, { data, loading, error }] =
    useMutation<SetQualifiedResponse>(SET_SUBMISSION_QUALIFIED);

  const setQualified = async (input: SetQualifiedInput) => {
    const result = await setQualifiedMutation({ variables: { input } });
    return result;
  };

  return { setQualified, data, loading, error };
};

/* 5) so `import { type VotingSubmission, ... } from "@/lib/graphql"` works.
      Your admin page already imports GetSocialPost types from "@/lib/graphql", so you
      probably have `export * from "./types"` somewhere. If so, skip this. If not, add: */
export type {
  VotingSubmission,
  LeaderboardEntry,
  VoterEntry,
  Submission,
  SubUser,
  ChallengeStatus,
  ChallengeStats,
  PublicSubmission,
  SubmissionVoteStatus,
} from "./types";


// /* 5) so `import { type VotingSubmission, ... } from "@/lib/graphql"` works.
//       Your admin page already imports GetSocialPost types from "@/lib/graphql", so you
//       probably have `export * from "./types"` somewhere. If so, skip this. If not, add: */
// export type {
//   VotingSubmission,
//   LeaderboardEntry,
//   VoterEntry,
//   Submission,
//   SubUser,
//   ChallengeStatus,
//   ChallengeStats,
//   SubmissionDetail,
// } from "./types";





/* 5) so `import { type VotingSubmission, ... } from "@/lib/graphql"` works.
      Your admin page already imports GetSocialPost types from "@/lib/graphql", so you
      probably have `export * from "./types"` somewhere. If so, skip this. If not, add: */
// export type {
//   VotingSubmission,
//   LeaderboardEntry,
//   VoterEntry,
//   Submission,
//   SubUser,
// } from "./types";