import axios from 'axios';

const updateTask = (params) => {
  axios.put(`/api/todo/${params.id}`, params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log("Error:",error);
  })
};

export default updateTask;
