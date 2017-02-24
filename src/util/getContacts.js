import axios from 'axios';

const getContacts = (username, callback) => {
  axios.get(`/api/contacts/${username}`)
  .then(response => callback(response.data))
  .catch(err => console.log(error));
};

export default getContacts;
