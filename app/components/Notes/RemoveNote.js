var React = require('react');

var RemoveNote = React.createClass({

  propTypes: {
  },

  handleRemove() {
    this.props.removeNote();
  },

  render: function() {
    return (
      <span className="pull-right">
        <i className="glyphicon glyphicon-remove"></i>
      </span>
    );
  }

});

module.exports = RemoveNote;
