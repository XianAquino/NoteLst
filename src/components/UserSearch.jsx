import React, { Component } from 'react';
import searchUser from '../util/searchUser';
import _ from 'underscore';
import * as userSearchActions from '../actions/userSearchActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Contacts from '../containers/Contacts';
import UserSearchResults from '../containers/UserSearchResults';
import { Divider, TextField } from 'material-ui';

const searchUserDebounce = _.debounce(searchUser, 500);

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearSearchField = this.clearSearchField.bind(this);
  }

  componentWillMount() {
    this.setState({name: ''});
    this.props.actions.clearResult();
  }

  clearSearchField() {
    this.setState({
      name: ''
    })
  }

  handleInputChange(event) {
    const {actions} = this.props;
    this.setState({name: event.target.value}, () => {
      searchUserDebounce(this.state.name, (users) => {
        actions.loadSearchResult(users);
      });
    });
  }

  render() {
    const { searchedUsers, username } = this.props;
    const { name } = this.state
    return(
      <div>
        <div className='search-user-container'>
          <TextField
            hintText='Enter Name'
            floatingLabelText='Search User'
            value={name}
            onChange={this.handleInputChange}
          />
        </div>
        <Divider/>
        {
          !name ? <Contacts />
          : <UserSearchResults
              search={true}
              clearResult={this.clearSearchField}
              users={searchedUsers}
              sender={username}
            />
        }
      </div>
    )
  }
};

UserSearch.propTypes = {
  actions: React.PropTypes.object,
  searchedUsers: React.PropTypes.array,
  username: React.PropTypes.string
};

const mapStateToProps = (state) => ({
  searchedUsers: state.searchedUsers,
  username: state.userInfo.username
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userSearchActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
