import { combineReducers } from 'redux';
import { users } from './users';
import { questions } from './questions'
import  { authorUser } from './authorUser';
import { loadingBarReducer } from "react-redux-loading-bar";

export default  combineReducers({
    authorUser,
    users,
    questions,
    loadingBar: loadingBarReducer,
})
