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
    const {user, actions} = this.props;
    groupRequest.joinedGroups(user.id, (groups) => {
      actions.loadGroups(groups);
    });
  }

  searchGroup(event) {
    const {user, actions} = this.props;
    this.setState({targetGroup: event.target.value}, () => {
        debounceSearch(this.state.targetGroup, user.id, (groups) => {
          actions.loadSearchedGroups(groups);
        });
      }
    );
  }

  render() {
    const { groups, searchedGroups, user } = this.props;
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
                targetGroup ? <SearchedGroups groups={searchedGroups} user={user}/>
                  : <JoinedGroups groups={groups} user={user}/>
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
  user: PropTypes.object,
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
