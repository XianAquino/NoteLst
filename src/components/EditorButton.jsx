import React, {Component, PropTypes} from 'react';

class EditorButton extends Component {
  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }
  render() {
    const {label, active, icon} = this.props;
    const className = active ? 'option-btn-active' : 'option-btn';
    return (
      <span
        onMouseDown={this.onToggle.bind(this)}
        className={className}
      >{icon ? <i className='material-icons'>{icon}</i> : label}</span>
    )
  }
}

EditorButton.propTypes = {
  onToggle: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.string
}

export default EditorButton;
