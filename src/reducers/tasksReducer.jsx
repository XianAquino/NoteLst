const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'UPDATE_TASK':
      return state.map(task => {
        if (task.id == action.payload.id) {
          return Object.assign(task, action.payload);
        } else {
          return task;
        }
      });
    case 'DELETE_TASK':
      return state.filter((task) => task.id!== action.payload);
    default:
      return state;
  }
};

export default tasksReducer;
