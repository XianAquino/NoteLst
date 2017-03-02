import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
