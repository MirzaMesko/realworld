import { REGISTER_NEW_USER, LOG_OUT, LOGIN_SUCCESS, GET_PROFILE_SUCCESS } from '../actions/users';

const initialState = {
    token: '',
    user: {}, 
    profile: {}
}

const users = (state = initialState, action) => {
    if (action.type === REGISTER_NEW_USER) {
        return {
          ...state,
          token: action.token,
          user: action.user,
        };
      }
      if (action.type === LOGIN_SUCCESS) {
        return {
          ...state,
          token: action.token,
          user: action.user,
        };
      }
      if (action.type === LOG_OUT) {
        return {
          ...state,
          user: {},
          token: '',
        };
      }
      if (action.type === GET_PROFILE_SUCCESS) {
        return {
          ...state,
          profile: action.profile
        };
      }
    return state;
}

export default users;