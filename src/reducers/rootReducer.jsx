import { combineReducers } from 'redux';
import login from './loginReducer.jsx';
import userInfo from './userInfoReducer.jsx';

const rootReducer = combineReducers({
  login,
  userInfo
});

export default rootReducer;
