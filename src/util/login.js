import axios from 'axios';

const login = (credentials, callback) => {
  axios.post('/api/login', credentials)
  .then((reponse) => {
    callback(reponse);
  })
  .catch((error) => {
    console.log("Error: ", error);
  })
}

export default login;
