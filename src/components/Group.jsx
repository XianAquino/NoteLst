import React, { Component, PropTypes } from 'react';
import groupRequest from '../util/groupRequest';
import * as groupActions from '../actions/groupActions';
import * as searchedGroupsActions from '../actions/searchedGroupsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Paper, RaisedButton, Divider} from 'material-ui';
import moment from 'moment';

class Group extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
    this.enter = this.enter.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
  }

  remove() {
    const { id, actions } = this.props;
    groupRequest.deleteGroup(id);
    actions.deleteGroup(id);
  }

  enter() {
    browserHistory.push(`/groups/${this.props.id}`);
  }

  newGroup() {
    const { id, name, dateCreated, createdBy, noOfMembers, creatorId} = this.props;
    return {
      group_id: id,
      name,
      creator: creatorId,
      date: dateCreated,
      date_joined: new Date().toISOString(),
      creator_name: createdBy,
      no_of_members: noOfMembers + 1
    };
  }

  newMember() {
    const { id, name, username }  = this.props.user;
    return {
      userId: id,
      name,
      username
    };
  }

  joinGroup() {
    const { id, actions, socket } = this.props;
    socket.emit('newMember', id, this.newMember());
    actions.addGroup(this.newGroup());
    actions.removeSearchedGroup(id);
  }

  render() {
    const { id, name, dateCreated, noOfMembers, user,
      createdBy, creatorId, dateJoined, nonMember } = this.props;

    let createdByDOM, groupFooter;

    const joinBtn = (
      <RaisedButton
        backgroundColor='#175057'
        labelColor='#FFF'
        label='Join'
        className='action-btn'
        onTouchTap={this.joinGroup}
      />);

    if (user.id !== creatorId) {
      createdByDOM = (
        <p>Created By: {createdBy} on <span>{moment(dateCreated).format('MMM Do YYYY')}</span></p>
      )
      groupFooter = nonMember ? joinBtn
                : (<div>
                    <p>Joined: <span>{moment(dateJoined).startOf('day').fromNow()}</span></p>
                    <RaisedButton
                      backgroundColor='#008A7D'
                      labelColor='#FFF'
                      label='Enter'
                      className='member-action-btn'
                      onTouchTap={this.enter}
                    />
                  </div>)
    } else {
      createdByDOM = (
        <p>Created on: <span>{moment(dateCreated).format('MMM Do YYYY')}</span></p>
      );
      groupFooter = (
        <div className='action-btn'>
          <RaisedButton
            backgroundColor='#C62828'
            labelColor='#FFF'
            label='Delete'
            onTouchTap={this.remove}
            style={{marginRight: '10px'}}
          />
          <RaisedButton
            backgroundColor='#008A7D'
            labelColor='#FFF'
            label='Enter'
            onTouchTap={this.enter}
          />
        </div>
      );
    }
    return(
      <li className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
        <Paper>
          <h3>Group: {name}</h3>
          <div className='group-body'>
            {createdByDOM}
            <p>No. of members: <span>{noOfMembers}</span></p>
          </div>
          <Divider/>
          <div className='group-footer'>
            {groupFooter}
          </div>
        </Paper>
      </li>
    )
  }
}

Group.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  dateCreated: PropTypes.string,
  noOfMembers: PropTypes.number,
  createdBy: PropTypes.string,
  creatorId: PropTypes.number,
  user: PropTypes.object,
  dateJoined: PropTypes.string,
  actions: PropTypes.object,
  nonMember: PropTypes.bool,
  socket: PropTypes.object
};

const mapStateToProps = (state) => ({
  socket: state.socket
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign(groupActions, searchedGroupsActions), dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Group);
