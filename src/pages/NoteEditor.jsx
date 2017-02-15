import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      note: undefined
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
    console.log(this.state);
  }

  render() {
    const { note } = this.props;
    return(
      <div>
        <input
          onChange={this.handleInputChange}
          name='title'
          value={this.state.title || note.title}
        />
        <textarea
          onChange={this.handleInputChange}
          name='note'
          value={this.state.note || note.note}
        ></textarea>
      </div>
    )
  }
};

NoteEditor.propTypes = {
  params: React.PropTypes.object,
  note: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    note: state.notes.filter( note => note.id == ownProps.params.noteId )[0]
  };
};

export default connect(mapStateToProps)(NoteEditor);
