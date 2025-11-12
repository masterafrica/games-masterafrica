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
}

export interface LoginUserInput {
  identifier: string;
  password: string;
}

export interface CreateNewUserInput {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
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

export interface GetUserResponse {
  getUser: User;
}

