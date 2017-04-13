import React, { PropTypes } from 'react';
import { DropDownMenu, MenuItem, Divider, RaisedButton } from 'material-ui'

const muiStyle = {
  dropDown: {
    width: 200
  },
  shareBtn: {
    margin: 16
  }
};

const GroupsDropDownList = ({share, groups, handleChange, value}) => {
  return(
    <div className='float-wrapper'>
      <DropDownMenu
        value={value}
        autoWidth={false}
        style={muiStyle.dropDown}
        onChange={handleChange}
      >
        <MenuItem value={0} primaryText={'Select Group'}/>
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
      <RaisedButton
        className='action-btn'
        label='Share'
        labelColor='#FFF'
        backgroundColor='#2CC7DE'
        onTouchTap={share}
        style={muiStyle.shareBtn}
      />
    </div>
  )
};

GroupsDropDownList.propTypes = {
  share: PropTypes.func,
  handleChange: PropTypes.func,
  group: PropTypes.array,
  value: PropTypes.number
}

export default GroupsDropDownList;
