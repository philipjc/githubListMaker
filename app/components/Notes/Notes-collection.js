import React from 'react';
import RemoveNote from './RemoveNote';

class NotesList extends React.Component {

  render() {
    let notes = this.props.notes.map((note, index) => {
      return (
        <li
          className="list-group-item"
          key={index}>
          {note}
          <RemoveNote />
        </li>
      );
    });
    return (
      <ul className="list-group">
        {notes}
      </ul>
    );
  }
}

export default NotesList;


// let NotesList = React.createClass({
//   propTypes: {
//     username: React.PropTypes.string.isRequired
//   },
//   render: function() {
//     let notes = this.props.notes.map((note, i) => {
//       return (
//         <li
//           className="list-group-item"
//           key={i}>
//           {note}
//           <RemoveNote />
//         </li>
//       );
//     });
//     return (
//       <ul className="list-group">
//         {notes}
//       </ul>
//     );
//   }
// });
