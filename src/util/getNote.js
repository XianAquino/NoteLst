import axios from 'axios';

const getNote = (userId, noteId, callback) => {
  axios.get(`/api/users/${userId}/notes/${noteId}`)
  .then(response => {
    callback(response.data);
  })
  .catch(error => {
    console.log("Error:", error);
  })
};

export default getNote;
