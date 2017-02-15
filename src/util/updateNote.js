import axios from 'axios';

const updateNote = (noteId, params) => {
  axios.put(`/api/notes/${noteId}`, params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log("Error:",error);
  })
};

export default updateNote;
