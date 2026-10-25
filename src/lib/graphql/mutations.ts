// graphqlquerry

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
  mutation SetupProfile($setUpProfileInput: SetupUserInput!) {
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
      phoneNumber
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      createdAt
      updatedAt
      firstName
      lastName
      heardPlatform
      username
      email
      bio
      dateOfBirth
      phoneCode
      avatar
      type
      verified
      EmailisVerified
      phoneNumber
      setup
      isDeleted
      followerCount
      followingCount
      CommunityCount
      CenterCount
      ApprenticeshipCount
      isFollowing
      isBlocked
      isBlockedByUser
      # skill {
      #   id
      #   createdAt
      #   updatedAt
      #   isDeleted
      #   name
      #   group
      #   apprentices
      #   masters
      # }
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

export const ADD_INTERVIEW_QUEST = gql`
  mutation AddInterviewQuest($input: AddInterviewQuestInput!) {
    AddInterviewQuest(input: $input) {
      id
      question
      answer
      options
      hint
      level
    }
  }
`;
export const SUBMISSION_MAG_SOCIAL_POST = gql`
  mutation SubmitSubmissions($input: SocialPostSubmissionsInput!) {
    SubmitSubmissions(input: $input) {
      id
  
    }
  }
`;


export const VERIFY_OTP = gql`
  mutation verifyUser($input: VerifyOtpInput!) {
    verifyUser(input: $input) {
      EmailisVerified
    }
  }
`;

export const RESENDOTPQUERY = gql`
query sendVerificationCode($identifier:String!) {
    sendVerificationCode(identifier:$identifier) {
       success
    }
}
`;























// ➜ In ./mutations.ts: DELETE the old TOGGLE_VOTE / SET_SUBMISSION_QUALIFIED block I gave you before
//   and PASTE this whole file instead.  (gql is already imported there.)

export const SUBMIT_CHALLENGE_ENTRY = gql`
  mutation SubmitChallengeEntry($input: SubmitChallengeEntryInput!) {
    SubmitChallengeEntry(input: $input) {
      id
    }
  }
`;

export const TOGGLE_VOTE = gql`
  mutation ToggleVote($input: ToggleVoteInput!) {
    ToggleVote(input: $input) {
      voted
      voteCount
    }
  }
`;

// admin: mark an entry qualified / not (only used when the backend qualified rule is ON)
export const SET_SUBMISSION_QUALIFIED = gql`
  mutation SetSubmissionQualified($input: SetQualifiedInput!) {
    SetSubmissionQualified(input: $input) {
      id
      qualified
    }
  }
`;

/* ───────── admin: challenges ───────── */
export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge($input: CreateChallengeInput!) {
    CreateChallenge(input: $input) {
      id
      slug
    }
  }
`;

export const UPDATE_CHALLENGE = gql`
  mutation UpdateChallenge($input: UpdateChallengeInput!) {
    UpdateChallenge(input: $input) {
      id
      slug
    }
  }
`;

export const SET_CHALLENGE_FINISHED = gql`
  mutation SetChallengeFinished($input: SetChallengeFinishedInput!) {
    SetChallengeFinished(input: $input) {
      id
      isFinished
      isOpen
      endsAt
    }
  }
`;

export const DELETE_CHALLENGE = gql`
  mutation DeleteChallenge($input: DeleteChallengeInput!) {
    DeleteChallenge(input: $input)
  }
`;

// admin: start / stop / schedule voting (entries are not affected)
export const SET_CHALLENGE_VOTING = gql`
  mutation SetChallengeVoting($input: SetChallengeVotingInput!) {
    SetChallengeVoting(input: $input) {
      id
      votingEnabled
      votingStartsAt
      isVotingOpen
      votingState
    }
  }
`;