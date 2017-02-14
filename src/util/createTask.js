import axios from 'axios';

const createTask = (userId, taskDetails, callback) => {
  axios.post(`api/users/${userId}/todos`, taskDetails)
  .then(response => {
    callback(response);
  })
  .catch(err => {
    console.log('Error', err);
  })
};

export default createTask;
