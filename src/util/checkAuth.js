import axios from 'axios';

const checkAuth = (callback) => {
  axios.get('/api/isAuthenticated')
  .then(response => {
    callback(response.data.isAuthenticated);
  })
  .catch(err => {
    console.log("Error", err);
  })
};
export default checkAuth;
