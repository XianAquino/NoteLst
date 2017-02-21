import axios from 'axios';

const getMessages = (conversationId, callback) => {
  axios.get(`/api/conversations/${conversationId}`)
  .then(response => callback(response.data))
  .catch(err => console.log(err));
};

export default getMessages;
