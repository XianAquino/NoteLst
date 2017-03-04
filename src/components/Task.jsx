import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import DeleteIcon from 'material-ui/svg-icons/action/delete'

const Task = ({id, title, desc, remove}) => {
  return(
    <div className='task col-xs-12 col-sm-12 col-md-6 col-lg-6'>
      <Card>
        <CardHeader title={title}>
          <DeleteIcon onClick={() => (remove(id))}/>
        </CardHeader>
        <CardText>{desc}</CardText>
      </Card>
    </div>
  )
};

Task.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  desc: React.PropTypes.string,
  remove: React.PropTypes.func
}

export default Task;
