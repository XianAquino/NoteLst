import axios from 'axios';

const signUp = (params, callback) => {
  axios.post('api/signUp', params)
  .then((response) => {
    callback(response);
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
};

export default signUp;
