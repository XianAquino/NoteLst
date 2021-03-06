import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Dashboard from './pages/Dashboard.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import NotFound from './pages/NotFound.jsx';
import Notes from './pages/Notes.jsx';
import NoteEditor from './pages/NoteEditor.jsx';
import Layout from './components/Layout.jsx';
import Messages from './pages/Messages.jsx';
import Conversation from './components/Conversation.jsx';
import NoUserSelected from './components/NoUserSelected.jsx';
import GroupsPage from './pages/GroupsPage.jsx';
import GroupPage from './pages/GroupPage.jsx';
import Settings from './pages/Settings.jsx';
import Auth from './pages/Auth.jsx';

import './css/app.css';

const App = () => {
  return (
    <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Dashboard} />
          <Route path=':username/notes' component={Notes} />
          <Route path='notes/:noteId' component={NoteEditor} />
          <Route path='messages' component={Messages}>
            <IndexRoute component={NoUserSelected} />
            <Route path=':messageId' component ={Conversation} />
          </Route>
          <Route path='groups' component={GroupsPage}/>
          <Route path='groups/:groupId' component={GroupPage}/>
          <Route path='settings' component={Settings}/>
        </Route>
        <Route path='/auth' component={Auth}>
          <Route path='login' component={Login} />
          <Route path='signup' component={SignUp} />
        </Route>
        <Route path='/*' component={NotFound} />
    </Router>
  );
};

export default App;
