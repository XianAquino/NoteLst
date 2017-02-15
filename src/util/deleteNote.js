import axios from 'axios';

const deleteNote = (noteId) => {
  axios.delete(`/api/notes/${noteId}`)
  .then(response => console.log(response))
  .catch(error => console.log("Error:", error));
};

export default deleteNote;
