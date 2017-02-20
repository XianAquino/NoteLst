import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import NotFound from './pages/NotFound.jsx';
import Notes from './pages/Notes.jsx';
import NoteEditor from './pages/NoteEditor.jsx';
import Layout from './components/Layout.jsx';
import Messages from './pages/Messages.jsx';
import DirectMessages from './components/DirectMessages.jsx';


const App = () => {
  return (
    <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Dashboard} />
          <Route path=':username/notes' component={Notes} />
          <Route path='notes/:noteId' component={NoteEditor} />
          <Route path='messages' component={Messages}>
            <Route path=':messageId' component ={DirectMessages} />
          </Route>
        </Route>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/*' component={NotFound} />
    </Router>
  );
};

export default App;
