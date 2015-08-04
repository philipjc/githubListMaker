import React from 'react';
import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';
import gitHelper from '../utils/helpers';
import Rebase  from 're-base';

let base = Rebase.createClass(/*firebase endpoint goes here*/);
// returns helper methods for interfacing with FireBase.


class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    };
  }

  init() {
    this.ref = base.bindToState(this.router.getCurrentParams().username, {
      context: this, // the component
      asArray: true, // returns data as Arry
      state: 'notes' // component state to sync
    });

    gitHelper.getGithubInfo(this.router.getCurrentParams().username)
      .then((dataObject) => {
        // No longer need to .bind() because of ES6 fat-arrow.
        this.setState({
          bio: dataObject.bio,
          repos: dataObject.repos
        });
      });
  }

  componentWillMount() {
    // set context on the class
    this.router = this.context.router;
  }
  componentDidMount() {
    this.init();
  }
  componentWillReceiveProps() {
    // stop listening to old binding
    base.removeBinding(this.ref);
    this.init();
  }
  componentWillUnmount() {
    // unbind listener (good practice).
    base.removeBinding(this.ref);
  }

  handleAddNote(newNote) {
    base.post(this.router.getCurrentParams().username, {
      data: this.state.notes.concat([newNote])
    });
  }

  // handleRemoveNote() {
  //   this.ref.child(this.router.getCurrentParams().username).remove();
  // },

  render() {
    let username = this.router.getCurrentParams().username;

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
            addNote={this.handleAddNote.bind(this)}
          />
        </div>
      </div>
    );
  }
};

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default Profile;

/*
  Profile will be managing the state of three other Components.
  User Profile
  User Repos
  Notes

  STATE MANAGEMENT
  ES6
  getInitialState is now the Constructor Method.

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

  MIXINS - Cannot use in ES6
  takes a components state and adds some properties to it.
  Router.State allows us to get the url parameter.
  this.router.getCurrentParams().username - same name (username) as in Router.

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
