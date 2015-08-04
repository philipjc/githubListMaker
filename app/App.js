import React from 'react';
import Router from 'react-router';
import routes from './config/routes';

Router.run(routes, (Root, state) => {
  React.render(<Root {...state} />, document.getElementById('app'));
});


/*

  state in Router has router properties, path, path-name, route parameters etc.
  And using the spread operateor {...state} we can add the properties of state
  as props to the Route component.

*/
