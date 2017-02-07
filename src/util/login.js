import axios from 'axios';

const login = (credentials, callback) => {
  axios.post('api/login', credentials)
  .then((reponse) => {
    console.log(reponse);
  })
  .catch((error) => {
    console.log("Error: ", error);
  })
}

export default login;
