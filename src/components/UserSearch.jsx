import React, { Component } from 'react';
import searchUser from '../util/searchUser';
import _ from 'underscore';

const searchUserDebounce = _.debounce(searchUser, 800);

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({name: event.target.value}, () => {
      console.log(this.state,"sdfsdf");
      searchUserDebounce(this.state.name);
    })
  }

  render() {
    return(
      <div>
        <label>Search User</label>
        <input
          onChange={this.handleInputChange}
          type='text'
          placeholder='Enter name'
          value={this.state.name}
        />
      </div>
    )
  }
}

export default UserSearch;
