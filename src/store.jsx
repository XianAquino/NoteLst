import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer.jsx';
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
//import { persistStore, autoRehydrate } from 'redux-persist';

let store = createStore(
  rootReducer,
  applyMiddleware(
    reduxThunk,
    createLogger()
  ),
  // autoRehydrate()
);

// persistStore(store, {
//   whitelist: ['login', 'userInfo'],
//   debounce: 50
// });

export default store;
