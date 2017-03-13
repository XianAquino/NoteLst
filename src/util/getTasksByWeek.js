import axios from 'axios';

const getTasksByWeek = (userId) => {
  axios.get(`/api/users/${userId}/todos/weekly`)
  .then(response => console.log(response))
  .catch(err => console.log(err));
};

export default getTasksByWeek;
