import axios from 'axios';

const getNotes = (userId, callback) => {
  axios.get(`/api/users/${userId}/notes`)
  .then(response => {
    callback(response);
  })
  .catch(error => {
    console.log("Error:", error);
  })
};

export default getNotes;
