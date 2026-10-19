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
      avatar
      type
      setup
      EmailisVerified
    }
  }
`;

export const GET_GAME_RESULTS = gql`
  query GetGameResults($input: getgamersresult!) {
    getGameResults(input: $input) {
      id
      point
      user {
        id
        firstName
        lastName
        username
        avatar
        email
        skill{
        
        name
        }
      }
    }
  }
`;

export const GET_GAMER_RESULT = gql`
  query GetGamerResult($input: getgamersresult!) {
    getGamerResult(input: $input) {
      id
      point
      user {
        username
      }
    }
  }
`;

export const GET_GAME_SETTING = gql`
  query GetGameSetting($type: String!) {
    getGameSetting(type: $type) {
      type
      music
      perclick
      pass
    }
  }
`;

export const GET_GAME_SOUNDS = gql`
  query GetGameSounds($type: String!) {
    getGameSounds(type: $type) {
      type
      incorrect
      correct
      music
      failure
      complete
      button_click
      select
      nav
    }
  }
`;

export const GET_GAME_LEVEL_INFORMATION = gql`
  query GetGameLevelInformation($input: getGameLevelInformationInput!) {
    getGameLevelInformation(input: $input) {
      level
      type
      time
      music
      perclick
      pass
    }
  }
`;

export const GET_GAMERS_CURRENT_RESULT = gql`
  query GetGamersCurrentResult($type: String!) {
    getGamersCurrentResult(type: $type) {
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

export const GET_GAMERS_CURRENT_PASSED_RESULT = gql`
  query GetGamersCurrentPassedResult($type: String!) {
    getGamersCurrentPassedResult(type: $type) {
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

export const GET_WALLET = gql`
  query GetWallet($walletId: ObjectId) {
    getWallet(WalletId: $walletId) {
      id
      bankName
      bankCode
      accountName
      accountNumber
      received
      spent
      user {
        id
        username
        email
      }
    }
  }
`;

export const GET_INTERVIEW_QUESTS = gql`
  query GetInterviewQuests($input: GetInterviewQuestsInput!) {
    GetInterviewQuests(input: $input) {
      questions {
        id
        question
        category
        difficulty
        options
        correctAnswer
        explanation
        createdAt
        updatedAt
      }
      total
      page
      limit
    }
  }
`;

export const GET_INTERVIEW_QUEST = gql`
  query GetInterviewQuest($input: GetInterviewQuestInput!) {
    GetInterviewQuest(input: $input) {
      id
      question
      options
      hint
      images
      level
    }
  }
`;
export const GET_AFROIQ = gql`
  query GetAfroIq($input: GetAfroIqInput!) {
    GetAfroIq(input: $input) {
      id
     
   
      hint
      images
      level
    }
  }
`;
export const GET_LOGIN_STATS = gql`
query GetLoginStats {
  GetLoginStats {
    todayLogins
    todaySignups
    totalSignups
    weekstats {
      totalSignups
      totalLogins
    }
  }
}
`;
export const GET_SOCIAL_POST_SUBMISSIONS = gql`
query GetSubmissions ($input: GetSocialPostSubmissionsInput!) {
  GetSubmissions(input: $input) {
  hasMore
  nextPage
  data { 
  id
  user{
  id
    email
    firstName
    lastName
    }
title
description
url
category
createdAt
updatedAt
}
  }
}
`;
export const GET_SIGNUP_GRAPH = gql`
query GetSignupGraph {
  GetSignupGraph {
    date
    totalSignups
  }
}
`;
export const GET_RECENT_SIGNUP_USERS = gql`
query GetRecentSignups {
  GetRecentSignups {
  id
    createdAt
    lastName
    firstName
    username
  }
}
`;

export const VERIFY_INTERVIEW_QUEST_ANSWER = gql`
  query VerifyInterviewquestAnswer($input: VerifyAnswerInput!) {
    VerifyInterviewquestAnswerAndScore(input: $input) {
      correct
      expected
    }
  }
`;
export const VERIFY_AFRO_IQ_ANSWER = gql`
  query VerifyAfroiqAnswer($input: VerifyAnswerInput!) {
    VerifyAfroiqAnswer(input: $input) {
      correct
      expected
    }
  }
`;
export const VERIFY_AND_SCORE_AFRO_IQ_ANSWER = gql`
  query VerifyAndScoreAfroiqAnswer($input: VerifyAnswerInput!) {
    VerifyAndScoreAfroiqAnswer(input: $input) {
      correct
      expected
    }
  }
`;

// Alternative verification endpoint that also scores on the server
export const VERIFY_AND_SCORE_RANDOM_QUIZ_ANSWER = gql`
  query VerifyAndScoreRandomQuizAnswer($input: VerifyAnswerInput!) {
    VerifyAndScoreRandomQuizAnswer(input: $input) {
      expected
      correct
    }
  }
`;

export const PICK_RANDOM_QUIZ_WINNER_TODAY = gql`
  query PickRandomQuizWinnerToday {
    pickRandomQuizWinnerToday {
      id
      createdAt
      updatedAt
      user {
        username
      }
      questionId
    }
  }
`;


export const GETSKILLSQUERY = gql`
query GetSkills($input:GetSkillsInput!) {
    GetSkills(input:$input) {
        hasMore
        nextPage
        skills{
          name
          id
          group
        }
    }
}
`;


































export const GET_CHALLENGE_STATS = gql`
  query GetChallengeStats {
    GetChallengeStats {
      weekStart
      weekEnd
      entriesThisWeek
      qualifiedThisWeek
      participantsThisWeek
      votesThisWeek
      totalEntries
    }
  }
`;































// ➜ In ./queries.ts: DELETE the old block I gave you before (from `const SUBMISSION_FIELDS` to the end)
//   and PASTE this whole file instead.  (gql is already imported there.)

const CHALLENGE_FIELDS = `
  id
  slug
  title
  tagline
  description
  image
  prize
  steps
  entryFeeNote
  showBankDetails
  titleLabel
  linkLabel
  descriptionLabel
  descriptionRequired
  maxDescriptionWords
  category
  endsAt
  isFinished
  isOpen
  createdAt
`;

const SUBMISSION_FIELDS = `
  id
  title
  url
  description
  category
  qualified
  voteCount
  createdAt
  user { id firstName lastName email }
  challenge { id slug title }
`;

/* ───────── challenges: public ───────── */
export const GET_CHALLENGES = gql`
  query GetChallenges($input: GetChallengesInput!) {
    GetChallenges(input: $input) {
      hasMore
      nextPage
      data { ${CHALLENGE_FIELDS} }
    }
  }
`;

export const GET_CHALLENGE_BY_SLUG = gql`
  query GetChallengeBySlug($input: GetChallengeBySlugInput!) {
    GetChallengeBySlug(input: $input) { ${CHALLENGE_FIELDS} }
  }
`;

/* ───────── challenges: admin ───────── */
export const GET_ADMIN_CHALLENGES = gql`
  query GetAdminChallenges($input: GetChallengesInput!) {
    GetAdminChallenges(input: $input) {
      hasMore
      nextPage
      data {
        entriesCount
        votesCount
        participantsCount
        challenge { ${CHALLENGE_FIELDS} }
      }
    }
  }
`;

export const GET_ADMIN_CHALLENGE = gql`
  query GetAdminChallenge($input: GetAdminChallengeInput!) {
    GetAdminChallenge(input: $input) {
      entriesCount
      votesCount
      participantsCount
      qualifiedCount
      qualificationEnabled
      challenge { ${CHALLENGE_FIELDS} }
    }
  }
`;

export const GET_CHALLENGE_OVERVIEW = gql`
  query GetChallengeOverview {
    GetChallengeOverview {
      openChallenges
      totalChallenges
      totalEntries
      totalVotes
    }
  }
`;

export const GET_CHALLENGE_SUBMISSIONS = gql`
  query GetChallengeSubmissions($input: GetChallengeSubmissionsInput!) {
    GetChallengeSubmissions(input: $input) {
      hasMore
      nextPage
      data {
        id
        title
        url
        description
        category
        createdAt
        updatedAt
        user { id firstName lastName email }
      }
    }
  }
`;

/* ───────── my status in a challenge ───────── */
export const GET_MY_CHALLENGE_STATUS = gql`
  query GetMyChallengeStatus($input: GetMyChallengeStatusInput!) {
    GetMyChallengeStatus(input: $input) {
      challengeOpen
      hasSubmitted
      canSubmit
      reason
      oneSubmissionPerChallenge
      qualificationEnabled
      entriesCount
      votesCount
      entry { ${SUBMISSION_FIELDS} }
    }
  }
`;

/* ───────── voting + leaderboard (per challenge) ───────── */
export const GET_VOTING_SUBMISSIONS = gql`
  query GetVotingSubmissions($input: GetVotingSubmissionsInput!) {
    GetVotingSubmissions(input: $input) {
      hasMore
      nextPage
      challenge { ${CHALLENGE_FIELDS} }
      data {
        hasVoted
        submission { ${SUBMISSION_FIELDS} }
      }
    }
  }
`;

export const GET_LEADERBOARD = gql`
  query GetLeaderboard($input: GetLeaderboardInput!) {
    GetLeaderboard(input: $input) {
      hasMore
      nextPage
      challenge { ${CHALLENGE_FIELDS} }
      data {
        rank
        voteCount
        submissionsCount
        categories
        user { id firstName lastName email }
        topSubmission { ${SUBMISSION_FIELDS} }
      }
    }
  }
`;

/* ───────── submissions per user ───────── */
export const GET_MY_SUBMISSIONS = gql`
  query GetMySubmissions($input: GetMySubmissionsInput!) {
    GetMySubmissions(input: $input) {
      hasMore
      nextPage
      totalSubmissions
      totalVotes
 
      categories
      user { id firstName lastName email }
      data { ${SUBMISSION_FIELDS} }
    }
  }
`;

export const GET_USER_SUBMISSIONS = gql`
  query GetUserSubmissions($input: GetUserSubmissionsInput!) {
    GetUserSubmissions(input: $input) {
      hasMore
      nextPage
      totalSubmissions
      totalVotes
      qualificationEnabled
      categories
      user { id firstName lastName email }
      data { ${SUBMISSION_FIELDS} }
    }
  }
`;

export const GET_VOTERS = gql`
  query GetVoters($input: GetVotersInput!) {
    GetVoters(input: $input) {
      hasMore
      nextPage
      data {
        votedAt
        voter { id firstName lastName email }
        submission { id title url category }
      }
    }
  }
`;

/* ───────── single submission page ───────── */
// public: no login needed
export const GET_PUBLIC_SUBMISSION = gql`
  query GetPublicSubmission($input: GetSubmissionInput!) {
    GetPublicSubmission(input: $input) {
      id
      title
      url
      description
      category
      qualified
      votingOpen
      qualificationEnabled
      challengeTitle
      challengeSlug
      challengeOpen
      voteCount
      createdAt
      ownerName
    }
  }
`;

// logged in only
export const GET_SUBMISSION_VOTE_STATUS = gql`
  query GetSubmissionVoteStatus($input: GetSubmissionInput!) {
    GetSubmissionVoteStatus(input: $input) {
      hasVoted
      isOwner
      canVote
      voteBlockedReason
    }
  }
`;



export const GET_SUBMISSION = gql`
  query GetSubmission($input: GetSubmissionInput!) {
    GetSubmission(input: $input) {
      hasVoted
      isOwner
      canVote
      voteBlockedReason
      submission { ${SUBMISSION_FIELDS} }
    }
  }
`;