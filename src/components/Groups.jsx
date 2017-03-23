import React, { Component, PropTypes } from 'react';
import groupRequest from '../util/groupRequest';
import * as groupActions from '../actions/groupActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Groups extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {userId, actions} = this.props;
    groupRequest.joinedGroups(userId, (groups) => {
      actions.loadGroups(groups);
    });
  }

  render() {
    const { groups } = this.props;
    if(groups.length) {
      return (
        <div className='col-xs-12 col-sm-12 col-md-9 col-lg-9'>
          <div>
            <ul>
              {
                groups.map(group =>
                  <li>{group.name}</li>
                )
              }
            </ul>
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
