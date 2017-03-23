import React, { Component, PropTypes } from 'react';
import groupRequest from '../util/groupRequest';

class Groups extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    groupRequest.joinedGroups(this.props.userId, (groups) => {
      console.log("groups", groups);
    });
  }

  render() {
    return (
      <div className='col-xs-12 col-sm-12 col-md-9 col-lg-9'>
        <p>test</p>
      </div>
    )
  }
}

Groups.propTypes = {
  userId: PropTypes.number
};

export default Groups;
