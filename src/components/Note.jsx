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
      value: 0,
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

  newPost() {
    const { title, image, name } = this.props;
    return {
      title,
      image,
      name,
      group_id: this.state.value,
      likes: 0,
      time_posted: new Date()
    };
  }

  share() {
    const groupId = this.state.value;
    const { socket, id, updateShareCount } = this.props;
    if (groupId) {
      socket.emit('shareNote', groupId, id, this.newPost());
      updateShareCount(id);
      this.showShareForm();
    }
  }

  render() {
    const { title, id, remove, groups, shared } = this.props
    return(
      <div>
        <li>
          <Link to={`/notes/${id}`}>{title}</Link><p>{shared}</p>
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
  socket: PropTypes.object,
  updateShareCount: PropTypes.func,
  name: PropTypes.string,
  image: PropTypes.string
}

const mapStateToProps = (state) => ({
  groups: state.groups,
  socket: state.socket,
  name: state.userInfo.name,
  image: state.userInfo.image
});

export default connect(mapStateToProps)(Note);
