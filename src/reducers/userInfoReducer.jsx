import {
  LOAD_USER,
  LOAD_USER_INFO,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS
} from '../actions/types';

const defaultState = {
  initialStateLoading: false,
  error: null,
  id: null,
  username: '',
  name: '',
  image: '',
  email: '',
  success: false
}

const userInfo = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, initialStateLoading: true };
    case LOAD_USER_SUCCESS:
      return { ...state, initialStateLoading: false, success: true };
    case LOAD_USER_INFO:
      return { ...state, ...action.payload };
    case LOAD_USER_FAIL:
      return { ...state, error: action.payload, initialStateLoading: false };
    default:
      return state;
  }
}

export default userInfo;
