import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './components/App';
import HomePage from './containers/HomePage';
import PollPage from './containers/PollPage';
//import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
//import AboutPage from './components/AboutPage.js';
//import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/polls" />
    <Route path="polls" component={HomePage}/>
    <Route path="poll/:pollId" component={PollPage}/>
  </Route>
);
//    <Route path="fuel-savings" component={FuelSavingsPage}/>
//   <Route path="about" component={AboutPage}/>
//  <Route path="*" component={NotFoundPage}/>
