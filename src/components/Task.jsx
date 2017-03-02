import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import DeleteIcon from 'material-ui/svg-icons/action/delete'

const Task = ({id, title, desc, remove}) => {
  return(
    <li>
      <Card>
        <CardHeader title={title}>
          <DeleteIcon onClick={() => (remove(id))}/>
        </CardHeader>
        <CardText>{desc}</CardText>
      </Card>
    </li>
  )
};

Task.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  desc: React.PropTypes.string,
  remove: React.PropTypes.func
}

export default Task;
