
import {_getUsers,_getQuestions}from "../data/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./autherUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";



export  function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, question]) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(question));
        dispatch(setAuthedUser(null));
        dispatch(hideLoading());
      }
    );
  };
}



/*

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, tweets }) => {
      _getUsers().then((users  => { console.log(
        users) receiveUsers(users));
     
      dispatch(receiveQuestions(tweets));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}

*/