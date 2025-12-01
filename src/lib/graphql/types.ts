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
  verified?: boolean;
  bio?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  avatar?: string;
  type?: string;
  setup?: boolean;
  EmailisVerified?: boolean;
}

export interface LoginUserInput {
  identifier: string;
  password: string;
}

export interface CreateNewUserInput {
  email: string;
  password: string;
  username?: string;
  // phoneNumber?: string;
  skillGroup?: ENUMSKILLGROUP;
  skill?: string;
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

export interface InterviewQuest {
  id: string;
  question: string;
  category: string;
  difficulty?: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddInterviewQuestInput {
  question: string;
  category: string;
  difficulty?: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface AddInterviewQuestResponse {
  AddInterviewQuest: InterviewQuest;
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

export interface GetInterviewQuestInput {
  id: string;
}

export interface GetInterviewQuestResponse {
  GetInterviewQuest: InterviewQuest;
}

export interface VerifyAnswerInput {
  questionId: string;
  answer: string;
}

export interface VerifyAnswerResponse {
  VerifyAnswer: {
    correct: boolean;
    feedback?: string;
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
