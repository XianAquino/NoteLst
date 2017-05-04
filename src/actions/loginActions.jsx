import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from '../actions/types';
import axios from 'axios';
import { browserHistory } from 'react-router';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER});
    axios.post('/api/login', credentials)
      .then(() => onLoginSuccess(dispatch))
      .catch((err) => onLoginFail(dispatch, err.response.data.error));
  }
};

const onLoginSuccess = (dispatch) => {
  dispatch({ type: LOGIN_USER_SUCCESS });
  browserHistory.push('/');
};

const onLoginFail = (dispatch, err) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: err
  });
};
