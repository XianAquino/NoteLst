import axios from 'axios';

const request = {
  update: (userId, params) => {
    axios.put(`/api/users/${userId}`, params)
  },
  changePwd: (userId, passwords, callback) => {
    axios.post(`/api/users/${userId}/changePwd`, passwords)
    .then(response => callback(response.data));
  }
};

export default request;
