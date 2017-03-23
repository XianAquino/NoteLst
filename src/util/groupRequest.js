import axios from 'axios';

const groupRequest = {
  createGroup: (params, callback) => {
    axios.post('/api/groups', params)
      .then(response => callback(response.data))
      .catch(err => console.log("Error:", err));
  },
  joinedGroups: (userId, callback) => {
    axios.get(`/api/groups?userId=${userId}`)
      .then(response => callback(response.data))
      .catch(err => console.log("Error:", err));
  }
}

export default groupRequest;
