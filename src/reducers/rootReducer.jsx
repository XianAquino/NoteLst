import { combineReducers } from 'redux';
import login from './loginReducer.jsx';
import userInfo from './userInfoReducer.jsx';
import tasks from './tasksReducer.jsx';

const rootReducer = combineReducers({
  login,
  userInfo,
  tasks
});

export default rootReducer;
