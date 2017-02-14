const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter((task) => task.id!== action.payload);
    default:
      return state;
  }
};

export default tasksReducer;
