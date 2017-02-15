import axios from 'axios';

const deleteTask = (taskId) => {
  axios.delete(`/api/todo/${taskId}`)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log("Error:", error);
  });
};

export default deleteTask;
