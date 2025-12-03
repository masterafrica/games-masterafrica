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
  query GetGameResults($input: GetGameResultsInput!) {
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

export const VERIFY_INTERVIEW_QUEST_ANSWER = gql`
  query VerifyInterviewquestAnswer($input: VerifyAnswerInput!) {
    VerifyInterviewquestAnswer(input: $input) {
      correct
      expected
    }
  }
`;
