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
import tasksByWeek from './tasksByWeekReducer.jsx';
import groups from './groupsReducer.jsx';
import searchedGroups from './searchedGroupsReducer.jsx';
import currentGroup from './currentGroupReducer.jsx';
import currentGroupMembers from './currentGroupMembersReducer.jsx';
import signUp from './signUpReducer.jsx';
import posts from './postReducer.jsx';
import searchedNotes from './noteSearchReducer.jsx';

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
  currentConversationID,
  tasksByWeek,
  groups,
  searchedGroups,
  currentGroup,
  currentGroupMembers,
  posts,
  signUp,
  searchedNotes
});

export default rootReducer;
