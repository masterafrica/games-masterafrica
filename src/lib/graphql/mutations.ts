import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      accessToken
      refreshToken
      username
      user {
        id
        email
        username
        firstName
        lastName
        verified
        bio
        dateOfBirth
        phoneNumber
        avatar
        type
        setup
        EmailisVerified
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($CreateNewUserInput: CreateNewUserInput!) {
    createUser(CreateNewUserInput: $CreateNewUserInput) {
      accessToken
      refreshToken
      username
      user {
        id
        email
        username
        firstName
        lastName
        verified
        bio
        dateOfBirth
        phoneNumber
        avatar
        type
        setup
        EmailisVerified
      }
    }
  }
`;

export const SETUP_PROFILE = gql`
  mutation SetupProfile($setUpProfileInput: SetUpProfileInput!) {
    SetupProfile(setUpProfileInput: $setUpProfileInput) {
      id
      firstName
      lastName
      username
      email
      setup
      avatar
      type
      verified
    }
  }
`;

export const UPDATE_GAMERS_RESULT = gql`
  mutation UpdateGamersResult($input: UpdateGamersResultInput!) {
    update_gamers_result(input: $input) {
      id
      user {
        id
        username
      }
      result
      agg
      pass
      level
      type
      time
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
    forgotPassword(forgotPasswordInput: $forgotPasswordInput) {
      success
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($resetPasswordInput: ResetPasswordInput!) {
    resetPassword(resetPasswordInput: $resetPasswordInput) {
      success
    }
  }
`;
