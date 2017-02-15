import { combineReducers } from 'redux';
import login from './loginReducer.jsx';
import userInfo from './userInfoReducer.jsx';
import tasks from './tasksReducer.jsx';
import notes from './notesReducer.jsx';

const rootReducer = combineReducers({
  login,
  userInfo,
  tasks,
  notes
});

export default rootReducer;
