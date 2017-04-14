import React, {Component} from 'react';
import { FlatButton } from 'material-ui';

class EditorButton extends Component {
  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }
  render() {
    const {label, active} = this.props;
    const btnColor = active ? '#2CC7DE' : '#FFF';
    return (
      <FlatButton
        label={label}
        backgroundColor={btnColor}
        onMouseDown={this.onToggle.bind(this)}
      />
    )
  }
}

export default EditorButton;
