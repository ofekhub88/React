import { combineReducers } from 'redux';
import { users } from './users';
import { tweets } from './tweets'
import  { authorUser } from './authorUser';
import { loadingBarReducer } from "react-redux-loading-bar";

export default  combineReducers({
    authorUser,
    users,
    tweets,
    loadingBar: loadingBarReducer,
})