import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer.jsx';
import createLogger from 'redux-logger';
import checkAuth from './checkAuth.jsx';
import { persistStore, autoRehydrate } from 'redux-persist';

let store = createStore(
  rootReducer,
  applyMiddleware(
    createLogger(),
    checkAuth
  ),
  autoRehydrate()
);

persistStore(store);

export default store;
