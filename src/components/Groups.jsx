import React, { Component, PropTypes } from 'react';
import groupRequest from '../util/groupRequest';
import * as groupActions from '../actions/groupActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JoinedGroups from '../containers/JoinedGroups';
import _ from 'underscore';
const debounceSearch = _.debounce(groupRequest.searchGroup, 300);

class Groups extends Component{
  constructor(props) {
    super(props);
    this.state = {
      targetGroup:''
    }
    this.searchGroup = this.searchGroup.bind(this);
  }

  componentWillMount() {
    const {userId, actions} = this.props;
    groupRequest.joinedGroups(userId, (groups) => {
      actions.loadGroups(groups);
    });
  }

  searchGroup(event) {
    this.setState({targetGroup: event.target.value},
      debounceSearch(this.state.targetGroup, (groups) => {
        console.log("groups", groups);
      })
    )
  }

  render() {
    const { groups, userId } = this.props;
    if(groups.length) {
      return (
        <div className='col-xs-12 col-sm-12 col-md-9 col-lg-9'>
          <div className='containers-fluid'>
            <div className='group-bar row'>
              <div className='search'>
                <input onChange={this.searchGroup} type='text' placeholder='Search Group'/>
              </div>
            </div>
            <div>
              <JoinedGroups groups={groups} userId={userId}/>
            </div>
          </div>
        </div>
      )
    }
    return null;
  }
}

Groups.propTypes = {
  userId: PropTypes.number,
  groups: PropTypes.array
};

const mapStateToProps = (state) => ({
  groups: state.groups
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
