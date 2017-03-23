import axios from 'axios';

const groupRequest = {
  createGroup: (params) => {
    axios.post('/api/groups', params)
      .then(response => console.log(response.data))
      .catch(err => console.log("Error:", err));
  }
}

export default groupRequest;
