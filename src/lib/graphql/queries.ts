import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($id: ObjectId!) {
    getUser(id: $id) {
      id
      email
      username
      firstName
      lastName
      verified
      bio
      dateOfBirth
      phoneNumber
      createdAt
      updatedAt
    }
  }
`;
