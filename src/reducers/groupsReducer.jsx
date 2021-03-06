import {
  LOAD_USER_GROUPS,
  ADD_GROUP,
  DELETE_GROUP
} from '../actions/types';


const groupsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_USER_GROUPS:
      return action.payload;
    case ADD_GROUP:
      return [action.payload, ...state];
    case DELETE_GROUP:
      return state.filter(group => group.group_id !== action.payload);
    default:
      return state;
  }
};

export default groupsReducer;
