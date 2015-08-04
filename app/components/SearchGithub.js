import React from 'react';
// var Router = require('react-router');

class SearchGithub extends React.Component {

  handleSubmit() {
    // debugger;
    let router = this.context.router;
    let username = this.refs.username.getDOMNode().value;
    if (!username) {return;}
    this.refs.username.getDOMNode().value = '';
    router.transitionTo('profile', {username: username});
  }

  render() {
    console.log(this.context, this.context.router);
    return (
      <div className="col-sm-12">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group col-sm-7">
            <input type="text" className="form-control" ref="username" />
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className="btn btn-block btn-primary">
              Search Github
            </button>
          </div>
        </form>
      </div>
    );
  }
};

SearchGithub.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default SearchGithub;

/*
  transitionTo comes from the mixin Router.Navigation
  The Profile Route was given the name profile.

  Using refs to get values from DOM nodes.

  ROUTING, ES6 - Cannot use Mixins!
  mixins: [Router.Navigation]
  React Router uses Context in React, Context in React and in React-Router enables us
  to pass some piece functionality (a func) to a child component.

*/
