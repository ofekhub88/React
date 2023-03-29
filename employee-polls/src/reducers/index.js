import { combineReducers } from 'redux';
import { users } from './users';
import { questions } from './questions'
import  { autherUser } from './autherUser';
import { loadingBarReducer } from "react-redux-loading-bar";

export default  combineReducers({
    autherUser,
    users,
    questions,
    loadingBar: loadingBarReducer,
})
