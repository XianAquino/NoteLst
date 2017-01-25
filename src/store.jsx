import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer.jsx';

export const store = createStore(rootReducer);
