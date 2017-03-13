import axios from 'axios';
import format from '../util/formatDateTime';

const getTasks = (userId, date, callback) => {
  const formatDate = format.toDate(date);
  axios.get(`/api/users/${userId}/todos?date=${formatDate}`)
  .then( response => {
    callback(response.data);
  })
  .catch(err => {
    console.log('Error:', err);
  })
};

export default getTasks;
