import axios from 'axios';

const getTasks = (userId, date, callback) => {
  const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  axios.get(`/api/users/${userId}/todos?date=${formatDate}`)
  .then( response => {
    callback(response.data);
  })
  .catch(err => {
    console.log('Error:', err);
  })
};

export default getTasks;
