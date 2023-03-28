import { _get_Questions,_saveQuestion } from "../data/_DATA";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const VOTE_QUESTION = "VOTE_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function voteQuestions({ id,authedUser,vote }) {
  return {
    type: VOTE_QUESTION,
    authedUser,
    vote,
  };
}

/*
function toggleQuestion({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_QUESTION,
    id,
    authedUser,
    hasLiked,
  };
}
*/
export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authorUser } = getState();
     console.log("auther"+authorUser)
     question["auther"] = authorUser;
    dispatch(showLoading());

    return _saveQuestion(
      question,
    )
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}


/*

function toggleQuestion({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_QUESTION,
    id,
    authedUser,
    hasLiked,
  };
}

export function handleVoteQuestion(info) {
  return (dispatch) => {
    dispatch(toggleQuestion(info));

    return saveLikeToggle(info).catch((e) => {
      console.warn("Error in handleToggleQuestion: ", e);
      dispatch(toggleQuestion(info));
      alert("The was an error liking the question. Try again.");
    });
  };
}
*/