import axios from 'axios';

const searchUser = (name) => {
  axios.get(`/api/users?name=${name}`)
  .then(response => console.log(response))
  .catch(err => console.log("Error:", err));
};

export default searchUser;
