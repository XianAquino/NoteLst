import React, { Component } from 'react';
import getTasks from '../util/getTasks';

class Tasks extends Component {
  componentWillMount() {
    const { userId } = this.props;
    getTasks(this.props.userId, (response) => {
      console.log(response);
    });
  }

  render() {
    return(
      <h2>Todos</h2>
    )
  }
};

Tasks.propTypes = {
  userId: React.PropTypes.number
};

export default Tasks;
