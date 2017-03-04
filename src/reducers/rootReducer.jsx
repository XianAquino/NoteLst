import { combineReducers } from 'redux';
import login from './loginReducer.jsx';
import userInfo from './userInfoReducer.jsx';
import tasks from './tasksReducer.jsx';
import notes from './notesReducer.jsx';
import socket from './socketReducer.jsx';
import socketConnected from './socketConnectionReducer.jsx';
import messages from './messagesReducer.jsx';
import searchedUsers from './userSearchReducer.jsx';
import contacts from './contactsReducer.jsx';
import currentConversationID from './currentConversationReducer.jsx';


const rootReducer = combineReducers({
  login,
  userInfo,
  tasks,
  notes,
  socket,
  messages,
  searchedUsers,
  contacts,
  socketConnected,
  currentConversationID
});

export default rootReducer;
