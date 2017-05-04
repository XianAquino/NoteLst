import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from '../actions/types';


const defaultState = {
  isLoggedIn: false,
  loading: false,
  error: '',
}

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_USER :
      return { ...state, loading: true };
    case LOGIN_USER_FAIL:
      return { ...state, loading: false, error: action.payload }
    case LOGIN_USER_SUCCESS:
      return { ...defaultState, isLoggedIn: true };
    default:
      return state;
  }
}

export default loginReducer;
