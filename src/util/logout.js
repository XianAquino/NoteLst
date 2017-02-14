import axios from 'axios';

const logout = (callback) => {
  axios.get('api/logout')
  .then(response => {
    callback(response);
  })
  .catch(error => {
    console.log('error', error);
  })
}

export default logout;
