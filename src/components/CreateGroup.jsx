import React, { Component } from 'react';
import { TextField, RaisedButton, Divider } from 'material-ui'

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    const name = event.target.value;
    this.setState({name});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({name: ''});
  }
  render() {
    return(
      <div>
        <h2>Create Groups</h2>
        <Divider/>
        <TextField
          hintText={'Enter Name'}
          floatingLabelText={'Name'}
          onChange={this.handleInput}
          value={this.state.name}
        />
        <br/>
        <RaisedButton
          backgroundColor='#3F51B5'
          labelColor='#FFF'
          label='Create Group'
          icon={<i className="material-icons">group_add</i>}
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

export default CreateGroup;
