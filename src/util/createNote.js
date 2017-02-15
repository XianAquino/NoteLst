import axios from 'axios';

const createNote = (userId, callback) => {
  axios.post(`/api/users/${userId}/notes`)
  .then(response => {
    callback(response.data);
  })
  .catch(error => {
    console.log("error:", error);
  });
};

export default createNote;
