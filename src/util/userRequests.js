import axios from 'axios';

const request = {
  update: (userId, params) => {
    axios.put(`/api/users/${userId}`, params)
  }
};

export default request;
