import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './components/App';
import HomePage from './containers/HomePage';
import PollPage from './containers/PollPage';
import CreatePollPage from './containers/CreatePollPage';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/polls" />
    <Route path="polls" component={HomePage}/>
    <Route path="poll/:pollId" component={PollPage}/>
    <Route path="newpoll" component={CreatePollPage}/>
  </Route>
);
