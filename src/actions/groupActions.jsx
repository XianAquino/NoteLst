import {
  LOAD_USER_GROUPS,
  ADD_GROUP,
  DELETE_GROUP
} from './types';

export const loadGroups = (dispatch, groups) => {
  dispatch({
    type: LOAD_USER_GROUPS,
    payload: groups
  });
};

export const addGroup = (group) => {
  return {
    type: ADD_GROUP,
    payload: group
  };
};

export const deleteGroup = (groupId) => {
  return {
    type: DELETE_GROUP,
    payload: groupId
  };
};
