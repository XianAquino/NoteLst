import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateNote from '../util/updateNote';
import getNote from '../util/getNote';
import _ from 'underscore';

const debounceUpdate = _.debounce(updateNote,500);

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      note: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    const { userId, params } = this.props;
    getNote(userId, params.noteId, (result) => {
      this.setState({
        title: result.title,
        note: result.note
      });
    });
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value }, () => {
      debounceUpdate(this.props.params.noteId, this.state);
    });
  }

  render() {
    const { note } = this.props;
    return(
      <div>
        <input
          onChange={this.handleInputChange}
          name='title'
          value={this.state.title}
        />
        <textarea
          onChange={this.handleInputChange}
          name='note'
          value={this.state.note}
        ></textarea>
      </div>
    )
  }
};

NoteEditor.propTypes = {
  params: React.PropTypes.object,
  userId: React.PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    userId: state.userInfo.id
  };
};

export default connect(mapStateToProps)(NoteEditor);
