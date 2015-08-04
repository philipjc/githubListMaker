import React from 'react';
import NotesList from './Notes-collection';
import AddNote from './AddNote';

class Notes extends React.Component {

  render() {
    return (
      <div>
        <h3>Notes for {this.props.username}</h3>
        <AddNote
          username={this.props.username}
          addNote={this.props.addNote}
        />
        <NotesList
          notes={this.props.notes}
          username={this.props.username}
        />
      </div>
    );
  }
};

Notes.propTypes = {
  username: React.PropTypes.string.isRequired,
  notes: React.PropTypes.array.isRequired,
  addNote: React.PropTypes.func.isRequired
};

export default Notes;
