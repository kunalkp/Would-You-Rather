import {
  RECEIVE_USERS,
  ADD_USER_ANSWER,
  ADD_USER_QUESTION
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };

    case ADD_USER_ANSWER:
      var { authedUser, qid, answer } = action.answer;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };

    case ADD_USER_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.authedUser]: {
          ...state[question.authedUser],
          questions: {
            ...state[question.authedUser].questions.concat([question.qid])
          }
        }
      };

    default:
      return state;
  }
}
