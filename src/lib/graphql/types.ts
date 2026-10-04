export enum ENUMSKILLGROUP {
  TECHNICAL = "technical",
  SOFT = "soft",
  MANUAL = "manual",
  CREATIVE = "creative",
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  heardPlatform?: string;
  verified?: boolean;
  bio?: string;
  dateOfBirth?: string;
  phoneCode?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  avatar?: string;
  type?: string;
  setup?: boolean;
  EmailisVerified?: boolean;
  isDeleted?: boolean;
  followerCount?: number;
  followingCount?: number;
  CommunityCount?: number;
  CenterCount?: number;
  ApprenticeshipCount?: number;
  isFollowing?: boolean;
  isBlocked?: boolean;
  isBlockedByUser?: boolean;
  skill?: Skill | null;
}

export interface Skill {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  name?: string;
  group?: ENUMSKILLGROUP | string;
  apprentices?: number;
  masters?: number;
}

export interface LoginUserInput {
  identifier: string;
  password: string;
}

export interface CreateNewUserInput {
  email: string;
  password: string;
  username?: string;
  // skill and skillGroup are not part of CreateNewUserInput - use SetupProfile instead
  // phoneNumber?: string;
}

export interface SetupProfileInput {
  firstName: string;
  lastName: string;
  heardPlatform: string;
  username?: string;
  referredBy?: string;
  skill?: string;
  type?: string;
  phoneCode?: string;
  phoneNumber?: string;
}
export interface VerifyOtpInput {
  code: string;

  identifier: string;
}

export interface AuthResponse {
  success: boolean;

  message?: string;
}

export interface LoginResponse {
  loginUser: {
    accessToken: string;
    refreshToken: string;
    username: string;
    user: User;
  };
}

export interface SignupResponse {
  createUser: {
    accessToken: string;
    refreshToken: string;
    username: string;
    user: User;
  };
}

export interface SetupProfileResponse {
  SetupProfile: User;
}

export interface UpdateUserInput {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  username?: string | null;
  phoneNumber?: string | null;
  avatar?: string | null;
  phoneCode?: string | null;
}

export interface UpdateUserResponse {
  updateUser: User;
}

export interface GetUserResponse {
  getUser: User;
}

export interface GameResult {
  id: string;
  point: number;
  user: User;
}

export interface GetGameResultsInput {
  username?: string;
}

export interface GetGameResultsResponse {
  getGameResults: GameResult[];
}

export interface GamerResult {
  id: string;
  point: number;
  user: {
    id: string;
    username: string;
  };
}

export interface GetGamerResultInput {
  username?: string;
}

export interface GetGamerResultResponse {
  getGamerResult: GamerResult;
}

export interface GameSetting {
  type: string;
  music?: string;
  perclick?: number;
  pass?: number;
}

export interface GameSound {
  type: string;
  incorrect?: string;
  correct?: string;
  music?: string;
  failure?: string;
  complete?: string;
  button_click?: string;
  select?: string;
  nav?: string;
}

export interface GameLevelInfo {
  level: number;
  type: string;
  time?: number;
  music?: string;
  perclick?: number;
  pass?: number;
}

export interface GetGameLevelInformationInput {
  level: number;
  type: string;
}

export interface GameResultUpdate {
  level: number;
  score: number;
  totalscore: number;
  type: string;
  time?: number;
}

export interface GameResultData {
  id: string;
  user: {
    id: string;
    username: string;
  };
  result: number;
  agg: number;
  pass: boolean;
  level: number;
  type: string;
  time?: number;
}

export interface GetGameSettingResponse {
  getGameSetting: GameSetting;
}

export interface GetGameSoundsResponse {
  getGameSounds: GameSound;
}

export interface GetGameLevelInfoResponse {
  getGameLevelInformation: GameLevelInfo;
}

export interface UpdateGameResultResponse {
  update_gamers_result: GameResultData;
}

export interface GetGamersCurrentResultResponse {
  getGamersCurrentResult: GameResultData;
}

export interface GetGamersCurrentPassedResultResponse {
  getGamersCurrentPassedResult: GameResultData;
}

export interface document {
  id: string;
}

export interface timestamp {
  createdAt?: string;
  updatedAt?: string;
}

export interface document_timestamp extends document, timestamp {}

export interface InterviewQuest {
  id: string;
  question: string;
  answer?: string; // Hidden from user, shown only after verification
  options?: string[];
  hint?: string;
  images?: string[];
  level?: string;
  category?: string; // Legacy field
  difficulty?: string; // Legacy field
  correctAnswer?: number; // Legacy field for multiple choice
  explanation?: string; // Legacy field
  createdAt?: string;
  updatedAt?: string;
}
export interface IAfroIq {
  id: string;
  question: string;
  answer?: string; // Hidden from user, shown only after verification
  options?: string[];
  hint?: string;
  images?: string[];
  level?: string;
  category?: string; // Legacy field
  difficulty?: string; // Legacy field
  correctAnswer?: number; // Legacy field for multiple choice
  explanation?: string; // Legacy field
  createdAt?: string;
  updatedAt?: string;
}
export interface SocialPostSubmissionsInput {
  url?: string;

  description?: string;

  title?: string;
  category?: string;

  // @Field(() => [String])
  // @IsArray({ message: "Please provide at least one skill for this reel" })
  // skill?: string[];
}
export interface AddInterviewQuestInput {
  question: string;
  answer: string;
  options?: string[];
  hint?: string;
  level?: string;
  category?: string; // Legacy field
  difficulty?: string; // Legacy field
  correctAnswer?: number; // Legacy field
  explanation?: string; // Legacy field
}

export interface AddInterviewQuestResponse {
  AddInterviewQuest: InterviewQuest;
}
export interface SocialPostSubmissionsResponse {
  SubmitSubmissions: { id: string };
}

export interface GetInterviewQuestsInput {
  page?: number;
  limit?: number;
  category?: string;
  difficulty?: string;
}

export interface GetInterviewQuestsResponse {
  GetInterviewQuests: {
    questions: InterviewQuest[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface Skills extends document_timestamp {
  isDeleted: boolean;

  name: string;

  group: string;

  apprentices: number;

  masters: number;
}
export interface GetSkillsResponse {
  hasMore: boolean;

  nextPage: number;

  skills: Skills[];
}

export interface GetInterviewQuestInput {
  page?: number;
  level?: string;
  id?: string; // Legacy field
}

export interface GetInterviewQuestResponse {
  GetInterviewQuest: InterviewQuest;
}
export interface GetAfroIqResponse {
  GetAfroIq: IAfroIq;
}

export interface GetWeekStats {
  totalSignups: number;

  totalLogins: number;
}

export interface GetLoginStats {
  todayLogins: number;

  todaySignups: number;

  totalSignups: number;

  weekstats: GetWeekStats;
}
export interface GetLoginStatsResponse {
  GetLoginStats: GetLoginStats;
}

export interface GetSocialPost {
  user: User;
  id: string;
  title?: string;
  description?: string;
  url?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export type GetSocialPostsState = {
  nextPage: number;
  hasMore: boolean;
  data: GetSocialPost[];
};
export interface GetSocialPostResponse {
  GetSubmissions: GetSocialPostsState;
}

export interface SignupGraphPoint {
  date: string;

  totalSignups: number;
}

export interface SignupGraphResponse {
  GetSignupGraph: SignupGraphPoint[];
}
export interface GetRecentSignUpUsersResponse {
  GetRecentSignups: User[];
}

export interface VerifyAnswerInput {
  id: string; // Question ID
  answer: string; // User's answer
}

export interface VerifyAnswerResponse {
  VerifyInterviewquestAnswer: {
    correct: boolean;
    expected?: string; // Correct answer (shown if wrong)
  };
}

export interface ForgotPasswordInput {
  identifier: string; // Can be email, username, or phone number
}

export interface ResetPasswordInput {
  code: string; // 4-digit OTP code
  identifier: string; // Same identifier used in forgotPassword
  password: string; // New password
}

export interface ForgotPasswordResponse {
  forgotPassword: {
    success: boolean;
  };
}

export interface ResetPasswordResponse {
  resetPassword: {
    success: boolean;
  };
}

export interface Wallet {
  id: string;
  bankName?: string;
  bankCode?: string;
  accountName?: string;
  accountNumber?: string;
  received: number;
  spent: number;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface GetWalletResponse {
  getWallet: Wallet;
}

export interface GetWalletInput {
  walletId?: string | null;
}

export interface RandomQuizWinner {
  id: string;
  createdAt: string;
  updatedAt: string;
  questionId: string;
  user: {
    username: string;
  };
}

export interface PickRandomQuizWinnerTodayResponse {
  pickRandomQuizWinnerToday: RandomQuizWinner | null;
}

export type getSkillInput = {
  group: string;

  page: number;
  filter?: string;
};

// ═════════════════════════════════════════════════════════════
//  MAG CHALLENGE: submissions, voting, leaderboard, dashboards
// ═════════════════════════════════════════════════════════════

export interface SubUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Submission {
  id: string;
  title?: string;
  url?: string;
  description?: string;
  category?: string;
  qualified: boolean;
  voteCount: number;
  createdAt: string;
  user: SubUser;
}

export interface PageMeta {
  hasMore: boolean;
  nextPage: number;
}

/* ---- vote list (user side) ---- */
export interface VotingSubmission {
  submission: Submission;
  hasVoted: boolean;
}
export interface GetVotingSubmissionsResponse {
  GetVotingSubmissions: PageMeta & { data: VotingSubmission[] };
}
export interface GetVotingSubmissionsInput {
  page?: number;
  weekStart?: string;
  category?: string;
}

/* ---- toggle vote ---- */
export interface ToggleVoteInput {
  submissionId: string;
}
export interface ToggleVoteResponse {
  ToggleVote: { voted: boolean; voteCount: number };
}

/* ---- leaderboard (user + admin) ---- */
export interface LeaderboardEntry {
  rank: number;
  user: SubUser;
  voteCount: number;
  submissionsCount: number;
  categories: string[];
  topSubmission?: Submission | null;
}
export interface GetLeaderboardInput {
  page?: number;
  weekStart?: string;
  category?: string;
}
export interface GetLeaderboardResponse {
  GetLeaderboard: PageMeta & {
    data: LeaderboardEntry[];
    weekStart: string;
    weekEnd: string;
  };
}

/* ---- submissions of a user (mine + admin) ---- */
export interface UserSubmissionsPage extends PageMeta {
  user: SubUser;
  totalSubmissions: number;
  totalVotes: number;
  categories: string[];
  data: Submission[];
}
export interface GetMySubmissionsInput {
  page?: number;
}
export interface GetMySubmissionsResponse {
  GetMySubmissions: UserSubmissionsPage;
}
export interface GetUserSubmissionsInput {
  page?: number;
  userId: string;
}
export interface GetUserSubmissionsResponse {
  GetUserSubmissions: UserSubmissionsPage;
}

/* ---- voters (admin) ---- */
export interface VoterEntry {
  voter: SubUser;
  submission: Submission;
  votedAt: string;
}
export interface GetVotersInput {
  page?: number;
  userId: string;
  weekStart?: string;
}
export interface GetVotersResponse {
  GetVoters: PageMeta & { data: VoterEntry[] };
}

/* ---- qualify (admin) ---- */
export interface SetQualifiedInput {
  submissionId: string;
  qualified: boolean;
}
export interface SetQualifiedResponse {
  SetSubmissionQualified: { id: string; qualified: boolean };
}

/* ---- user challenge dashboard ---- */
export interface ChallengeStatus {
  weekStart: string;
  weekEnd: string; // exclusive: the following Monday
  oneSubmissionPerWeek: boolean;
  hasSubmittedThisWeek: boolean;
  canSubmit: boolean;
  entriesThisWeek: number;
  votesThisWeek: number;
  entry?: Submission | null;
}
export interface GetMyChallengeStatusResponse {
  GetMyChallengeStatus: ChallengeStatus;
}

/* ---- admin dashboard: this week's numbers ---- */
export interface ChallengeStats {
  weekStart: string;
  weekEnd: string; // exclusive: the following Monday
  entriesThisWeek: number;
  qualifiedThisWeek: number;
  participantsThisWeek: number;
  votesThisWeek: number;
  totalEntries: number;
}
export interface GetChallengeStatsResponse {
  GetChallengeStats: ChallengeStats;
}

/* ---- single submission page (public link) ---- */
export interface PublicSubmission {
  id: string;
  title?: string | null;
  url?: string | null;
  description?: string | null;
  category?: string | null;
  qualified: boolean;
  votingOpen: boolean;
  voteCount: number;
  createdAt: string;
  ownerName: string;
}
export interface GetPublicSubmissionResponse {
  GetPublicSubmission: PublicSubmission;
}
export interface SubmissionVoteStatus {
  hasVoted: boolean;
  isOwner: boolean;
  canVote: boolean;
  voteBlockedReason?: string | null;
}
export interface GetSubmissionVoteStatusResponse {
  GetSubmissionVoteStatus: SubmissionVoteStatus;
}
export interface GetSubmissionInput {
  submissionId: string;
}