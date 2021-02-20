import { REGISTER_NEW_USER } from '../actions/users';
import { LOGIN_SUCCESS } from '../actions/users';

const initialState = {
    token: '',
    user: {}
}

const reducer = (state = initialState, action) => {
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
    return state;
}

export default reducer;