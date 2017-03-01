import axios from 'axios';

const createConversationId = (user1, user2, callback) => {
  axios.post('/api/conversations', {user1, user2})
  .then(response => callback(response.data))
  .catch(err => console.log(err));
};

export default createConversationId;
