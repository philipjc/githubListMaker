import React from 'react';

class AddNote extends React.Component {

  handleSubmit(e) {
    var newNote = this.refs.note.getDOMNode().value;
    this.refs.note.getDOMNode().value = '';
    this.props.addNote(newNote);
  }

  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" ref="note" placeholder="Add New Note" />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.handleSubmit.bind(this)}>
            Add Note
          </button>
        </span>
      </div>
    );
  }
};

AddNote.propTypes = {
  username: React.PropTypes.string.isRequired,
  addNote: React.PropTypes.func.isRequired
};

export default AddNote;



/*
  propTypes have to be added to the class object, not set inside.
  ref is like a name badge to grab later. We use it in the handleSubmit Method.

  Technically we're not in an object, so no need for commas inbetween methods.
  ES6 Classes do not auto bind 'this' so we need to mind methods.
*/
