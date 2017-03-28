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
  },
  searchGroup: (target, userId, callback) => {
    axios.get(`/api/groups?search=${target}&userId=${userId}`)
      .then(response => callback(response.data))
      .catch(err => console.log("Error:", err));
  },
  joinGroup: (groupId, userId) => {
    axios.post(`/api/groups/${groupId}/join/${userId}`)
      .then(response => console.log(response.data))
      .catch(err => console.log("Error:", err));
  },
  getGroup: (groupId, callback) => {
    axios.get(`/api/groups/${groupId}`)
      .then(response => callback(response.data))
      .catch(err => console.log("Error:", err));
  },
  getMembers: (groupId, callback) => {
    axios.get(`/api/groups/${groupId}/members`)
      .then(response => callback(response.data))
      .catch(err => console.log("Error:", err));
  },
  getPosts: (groupId, userId, callback) => {
    axios.get(`/api/groups/${groupId}/posts?likeBy=${userId}`)
      .then(response => callback(response.data))
      .catch(err => console.log("Error:", err));
  },
  deleteGroup: (groupId) => {
    axios.delete(`/api/groups/${groupId}`)
      .then(response => console.log(response))
      .catch(err => console.log("error", error));
  }
}

export default groupRequest;
