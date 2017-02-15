import React, { Component } from 'react';

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      note: undefined
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
    console.log(this.state);
  }


  render() {
    return(
      <div>
        <input
          onChange={this.handleInputChange}
          name='title'
          value={this.state.title}
        />
        <textarea
          onChange={this.handleInputChange}
          name='note'
          value={this.state.note}
        ></textarea>
      </div>
    )
  }
};

export default NoteEditor;
