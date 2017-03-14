const tasksByWeekReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TASKS_BY_WEEK':
      return action.payload;
    default:
      return state;
  }
};

export default tasksByWeekReducer;
