import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { DropDownMenu, MenuItem } from 'material-ui'

const styles = {
  customWidth: {
    width: 200
  }
};

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openShare: false,
      value: 0
    }
    this.showShareForm = this.showShareForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.share = this.share.bind(this);
  }

  showShareForm() {
    this.setState({openShare: !this.state.openShare});
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  share() {
    if (this.state.value) {
      console.log('share', this.state.value);
    }
  }

  render() {
    const { title, id, remove, groups } = this.props
    return(
      <div>
        <li>
          <Link to={`/notes/${id}`}>{title}</Link>
          <button onClick={() => { remove(id) }}>X</button>
          <button onClick={this.showShareForm}>Share</button>
          {
            !this.state.openShare ? null
            : <div>
                <DropDownMenu
                  value={this.state.value}
                  autoWidth={false}
                  style={styles.customWidth}
                  onChange={this.handleChange}
                >
                  <MenuItem value={0} primaryText={'Select'}/>
                {
                  groups.map((group, i) =>
                    <MenuItem
                      key={i}
                      value={group.group_id}
                      primaryText={group.name}
                    />
                  )
                }
                </DropDownMenu>
                <button onClick={this.share}>Share</button>
              </div>
            }
        </li>
      </div>
    )
  }
};

Note.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  remove: PropTypes.func,
  groups: PropTypes.array,
  socket: PropTypes.object
}

const mapStateToProps = (state) => ({
  groups: state.groups,
  socket: state.socket
});

export default connect(mapStateToProps)(Note);
