var React = require('react');
var Router = require('react-router');
var UserProfile = require('./Github/UserProfile');
var Repos = require('./Github/Repos');
var Notes = require('./Notes/Notes');
var Firebase = require('firebase');
var gitHelper = require('../utils/helpers');

var Profile = React.createClass({
  // mixins: [Router.State, ReactFireMixin],

  getInitialState() {
    return {
      notes: [],
      bio: {},
      repos: []
    };
  },

  init() {
    // When init runs, create new ref and bind it.
    var childRef = this.ref.child(this.getParams().username);
    // bind the username data to component state
    this.bindAsArray(childRef, 'notes');

    gitHelper.getGithubInfo(this.getParams().username)
    .then(function(dataObject) {
      // this.setState is in a new scope here, so we .bind()
      this.setState({
        bio: dataObject.bio,
        repos: dataObject.repos
      });
    }.bind(this));
  },

  componentDidMount() {
    this.ref = new Firebase('https://brilliant-torch-5076.firebaseio.com');
    this.init();
  },

  componentWillUnmount() {
    // unbind listener (good practice).
    this.unbind('notes');
  },

  componentWillReceiveProps() {
    // stop listening to old binding
    this.unbind('notes');
    this.init();
  },

  handleAddNote(newNote) {
    this.ref.child(this.getParams().username).set(this.state.notes.concat([newNote]));
    // A convention of making a state change in React is to set state.
    // Seen as though the firebase notes are the state, its similar.
  },

  // handleRemoveNote() {
  //   this.ref.child(this.getParams().username).remove();
  // },

  render() {
    var username = this.getParams().username;

    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile
            username={username}
            bio={this.state.bio}
          />
        </div>
        <div className="col-md-4">
          <Repos
            username={username}
            repos={this.state.repos}
          />
        </div>
        <div className="col-md-4">
          <Notes
            username={username}
            notes={this.state.notes}
            addNote={this.handleAddNote}
          />
        </div>
      </div>
    );
  }
});

module.exports = Profile;

/*
  Profile will be managing the state of three other Components.
  User Profile
  User Repos
  Notes

  STATE MANAGEMENT
  With the Profile Component taking care of it's three child components, we want any data
  related to those components to be managed here aswell. This way the child components
  will keep the updated data (Source of truth). We can add functions in Profile and pass them
  as props to be used in the child components.

  componentDidMount
  Runs after the component mounts to the view(DOM)
  Here you Fire Ajax requests and other listeners, like firebase listeners.
  For this app, I create a firebase object.

  componentWillReceiveProps
  Invoked when a component is receiving new props. This method is not called for the initial render.
  Use this as an opportunity to react to a prop transition before render() is called by updating
  the state using this.setState(). The old props can be accessed via this.props.
  Calling this.setState() within this function will not trigger an additional render.
  We use it in this app to check for a Route change, to update with a new User.

  MIXINS
  takes a components state and adds some properties to it.
  Router.State allows us to get the url parameter.
  this.getParams().username - same name (username) as in Router.

  PROPTYPES
  The three child components of Profile each rely on some props to
  render correctly. We can use propTypes to ensure our props. (see each compo)
  This allows us to Type check the props, and throw errors if the value is not present.

  FIREBASE
  reactfire - Component state can be bound to a FireBase endpoint.
  FBMixin gives us bindAsArray* as a component property. Takes two args. A reference to your
  firebase, and the property on the state to bind the firebase to.
  *https://www.firebase.com/docs/web/libraries/react/api.html?utm_source=reactfire

*/
