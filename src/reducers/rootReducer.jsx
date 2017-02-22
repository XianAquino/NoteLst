import { combineReducers } from 'redux';
import login from './loginReducer.jsx';
import userInfo from './userInfoReducer.jsx';
import tasks from './tasksReducer.jsx';
import notes from './notesReducer.jsx';
import socket from './socketReducer.jsx';
import messages from './messagesReducer.jsx';
import searchedUsers from './userSearchReducer.jsx';

const rootReducer = combineReducers({
  login,
  userInfo,
  tasks,
  notes,
  socket,
  messages,
  searchedUsers
});

export default rootReducer;
