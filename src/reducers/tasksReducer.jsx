const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_TASKS':
      return [...state, ...action.payload];
    case 'ADD_TASK':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default tasksReducer;
