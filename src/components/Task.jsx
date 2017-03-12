import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Divider, RaisedButton } from 'material-ui'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

const Task = ({id, title, desc, remove, finish, updateTask}) => {
  let updateButton
  if (finish) {
    updateButton = (
      <RaisedButton
        backgroundColor='#00C853'
        labelColor='#FFF'
        label='Revert'
        onTouchTap={() => {updateTask({
          finish: 0,
          id
        })}}
      />
    )
  } else {
    updateButton = (
      <RaisedButton
        backgroundColor='#00C853'
        labelColor='#FFF'
        label='Done'
        onTouchTap={() => {updateTask({
          finish: 1,
          id
        })}}
      />
    )
  }

  return(
    <div className='task col-xs-12 col-sm-12 col-md-6 col-lg-6'>
      <Card>
        <CardHeader title={title} />
        <Divider />
        <CardText>{desc}</CardText>
        <CardActions>
          {
            updateButton
          }
          <RaisedButton
            backgroundColor='#C62828'
            labelColor='#FFF'
            label='Delete'
            onTouchTap={() => (remove(id))} />
        </CardActions>
      </Card>
    </div>
  )
};

Task.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  desc: React.PropTypes.string,
  remove: React.PropTypes.func,
  updateTask: React.PropTypes.func,
}

export default Task;
