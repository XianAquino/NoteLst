import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Paper, Divider } from 'material-ui';
import GroupsDropDownList from './GroupsDropDownList';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openShare: false,
      value: 0,
    }
    this.showShareForm = this.showShareForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.share = this.share.bind(this);
  }

  showShareForm() {
    this.setState({openShare: !this.state.openShare});
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  newPost() {
    const { id, title, image, name } = this.props;
    return {
      note_id: id,
      title,
      image,
      name,
      group_id: this.state.value,
      likes: 0,
      time_posted: new Date()
    };
  }

  share() {
    const groupId = this.state.value;
    const { socket, id, updateShareCount } = this.props;
    if (groupId) {
      socket.emit('shareNote', groupId, id, this.newPost());
      updateShareCount(id);
      this.showShareForm();
    }
  }

  render() {
    const { title, id, remove, groups, shared } = this.props
    return(
      <li className='notes-box col-xs-12 col-sm-6 col-md-4 col-lg-3'>
        <Paper>
          <div className='note-header'>
            <Link to={`/notes/${id}`}>{title}</Link>
            <i
              className='delete-icon material-icons'
              onClick={() => { remove(id) }}
              >cancel</i>
          </div>
          <Divider/>
          <p>Shared: <span className='shared-count'>{shared} time(s)</span></p>
          <div className='float-wrapper'>
            <i
              onClick={this.showShareForm}
              className='material-icons'
            >keyboard_arrow_down</i>
          </div>
          <Divider/>
          {
            !this.state.openShare ? null
            : <GroupsDropDownList
                value={this.state.value}
                handleChange={this.handleChange}
                groups={groups}
                share={this.share}
              />
            }
        </Paper>
      </li>
    )
  }
};

Note.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  remove: PropTypes.func,
  groups: PropTypes.array,
  socket: PropTypes.object,
  updateShareCount: PropTypes.func,
  name: PropTypes.string,
  image: PropTypes.string
}

const mapStateToProps = (state) => ({
  groups: state.groups,
  socket: state.socket,
  name: state.userInfo.name,
  image: state.userInfo.image
});

export default connect(mapStateToProps)(Note);
