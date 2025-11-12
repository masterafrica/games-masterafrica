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
      }
    }
  }
`;
