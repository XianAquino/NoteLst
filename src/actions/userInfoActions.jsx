import {
  LOAD_USER,
  LOAD_USER_INFO,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS
} from './types';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { initializeSocket } from './socketActions';
import { loadGroups } from './groupActions';

export const updateUserInfo = (userInfo) => {
  return {
    type: 'UPDATE_USER_INFO',
    payload: userInfo
  };
};

const loadUserInfo = (dispatch, user) => {
  dispatch({
    type: LOAD_USER_INFO,
    payload: user
  });
};

const fetchUserGroups = (dispatch, userId) => {
  axios.get(`/api/groups?userId=${userId}`)
    .then(response => {
      loadGroups(dispatch, response.data);
      dispatch({ type: LOAD_USER_SUCCESS });
    })
    .catch(err => {
      dispatch({ type: LOAD_USER_FAIL, error: err });
    });
}

const fetchUserInfo = (dispatch, getState) => {
  axios.get('/api/initialInfo')
    .then( user => {
      loadUserInfo(dispatch, user.data);
      initializeSocket(dispatch);
      const userId = getState().userInfo.id;
      fetchUserGroups(dispatch, userId);
    })
    .catch(err => {
      dispatch({ type: LOAD_USER_FAIL, error: err });
    });
}

export const loadUser = () => {
  return (dispatch, getState) => {
    // check first if the user is authenticated
    axios.get('/api/isAuthenticated')
      .then((response) => {
        if(response.data.isAuthenticated) {
          dispatch({ type: LOAD_USER });
          fetchUserInfo(dispatch, getState);
        } else {
          browserHistory.push('/auth/login');
        }
      });
  };
};
