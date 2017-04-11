import axios from 'axios';

const searchNotes = (userId, targetNotes, callback) => {
    axios.get(`/api/users/${userId}/notes?target=${targetNotes}`)
    .then(response => callback(response.data))
    .catch(err => console.log("Error:", err));
};

export default searchNotes;
