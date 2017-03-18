import axios from 'axios';

const getParticipants = (conversationId, callback) => {
  axios.get(`/api/conversations/${conversationId}/participants`)
  .then(response => callback(response.data))
  .catch(err => console.log('error:', error));
};

export default getParticipants;
