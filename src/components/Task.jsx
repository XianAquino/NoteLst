import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Divider, RaisedButton } from 'material-ui'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

const Task = ({id, title, desc, date, remove, finish, updateTask}) => {
  let updateButton,
      cardStyle = {backgroundColor: '#FFF'};

  if (finish) {
    cardStyle.backgroundColor = '#B2DFDB';
    updateButton = (
      <RaisedButton
        backgroundColor='#FFF'
        labelColor='#455A64'
        label='Revert'
        onTouchTap={() => (updateTask({
            finish: 0,
            id,
          }, date))
        }
      />
    )
  } else {
    updateButton = (
      <RaisedButton
        backgroundColor='#008A7D'
        labelColor='#FFF'
        label='Done'
        onTouchTap={() => (updateTask({
            finish: 1,
            id,
          }, date))
        }
      />
    )
  }

  return(
    <div className='task col-xs-12 col-sm-12 col-md-6 col-lg-6'>
      <Card style={cardStyle}>
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
            onTouchTap={() => (
              remove({
                id,
                status: finish ? 'finish' : 'unfinish',
                date
              })
            )}
          />
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
