import axios from 'axios';

const signUp = (params) => {
  axios.post('api/signUp', params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
};

export default signUp;
