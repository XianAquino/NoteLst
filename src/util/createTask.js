import axios from 'axios';

const createTask = (userId, taskDetails) => {
  axios.post(`api/users/${userId}/todos`, taskDetails)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log('Error', err);
  })
};

export default createTask;
