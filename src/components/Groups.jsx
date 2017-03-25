import React, { Component, PropTypes } from 'react';
import groupRequest from '../util/groupRequest';
import * as groupActions from '../actions/groupActions';
import * as searchedGroupsActions from '../actions/searchedGroupsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JoinedGroups from '../containers/JoinedGroups';
import SearchedGroups from '../containers/SearchedGroups';
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
    const {loadSearchedGroups} = this.props.actions;
    this.setState({targetGroup: event.target.value}, () => {
        debounceSearch(this.state.targetGroup, (groups) => {
          loadSearchedGroups(groups);
        });
      }
    );
  }

  render() {
    const { groups, searchedGroups, userId } = this.props;
    const { targetGroup } = this.state;
    if(groups.length) {
      return (
        <div className='col-xs-12 col-sm-12 col-md-9 col-lg-9'>
          <div className='containers-fluid'>
            <div className='group-bar row'>
              <div className='search'>
                <input onChange={this.searchGroup} type='text' placeholder='Search Group'/>
              </div>
            </div>
            <div className='row'>
              {
                targetGroup ? <SearchedGroups groups={searchedGroups} userId={userId}/>
                  : <JoinedGroups groups={groups} userId={userId}/>
              }
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
  groups: PropTypes.array,
  searchedGroups: PropTypes.array
};

const mapStateToProps = (state) => ({
  groups: state.groups,
  searchedGroups: state.searchedGroups
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign(groupActions, searchedGroupsActions), dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
