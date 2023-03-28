import { SET_AUTHED_USER } from "../actions/authorUser"

export  function authorUser(state = null,action)  {
  switch (action.type) {
    case SET_AUTHED_USER:
        return  action.id
    default:
        return state;
  }
};