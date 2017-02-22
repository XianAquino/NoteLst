import axios from 'axios';

const searchUser = (name, callback) => {
  axios.get(`/api/users?name=${name}`)
  .then(response => callback(response.data))
  .catch(err => console.log("Error:", err));
};

export default searchUser;
