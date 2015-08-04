import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import Profile from '../components/Profile';

// ES6 Destructoring
import { Router, Route, DefaultRoute } from 'react-router';
// var Router = require('react-router');
// var DefaultRoute = Router.DefaultRoute;
// var Route = Router.Route;


export default (
  <Route name="app" path="/" handler={Main}>
    <Route name="profile" path="profile/:username" handler={Profile} />
    <DefaultRoute handler={Home} />
  </Route>
)


/*

  This file is like the instruction for App.js Router.run block.
  Tells Router.run which Component to render based on the url path.

  Route handler=Main will always show.
  If no Routes match, then Default Route is used.

  :username will be a parameter for the query string.

*/
