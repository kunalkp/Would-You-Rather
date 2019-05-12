import { getInitialData, saveQuestionAnswer, saveQuestion } from "../utils/api";
import { receiveUsers, addUserAnswer, addUserQuestion } from "./users";
import { receiveQuestions, addAnswerVote, addQuestion } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleAddAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    }).then(() => {
      dispatch(
        addUserAnswer({
          authedUser,
          qid,
          answer
        })
      );
      dispatch(
        addAnswerVote({
          authedUser,
          qid,
          answer
        })
      );
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    }).then(question => {
      dispatch(
        addUserQuestion({
          authedUser,
          qid: question.id
        })
      );
      dispatch(addQuestion(question));
    });
  };
}
