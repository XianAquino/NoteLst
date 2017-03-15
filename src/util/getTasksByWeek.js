import axios from 'axios';

const getTasksByWeek = (userId, callback) => {
  axios.get(`/api/users/${userId}/todos/weekly`)
  .then(response => callback(response.data))
  .catch(err => console.log(err));
};

export default getTasksByWeek;
