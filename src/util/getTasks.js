import axios from 'axios';

const getTasks = (userId, callback) => {
  axios.get(`/api/users/${userId}/todos`)
  .then( response => {
    callback(response.data);
  })
  .catch(err => {
    console.log('Error:', err);
  })
};

export default getTasks;
