const tasksByWeekReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TASKS_BY_WEEK':
      return action.payload;
    case 'ADD_TASKS_BY_WEEK':
      if(state.unfinishTaskByWeek[action.payload] !== undefined)
        return {
          finishTaskByWeek: state.finishTaskByWeek,
          unfinishTaskByWeek:
            Object.assign({}, state.unfinishTaskByWeek, {date: ++state.unfinishTaskByWeek[action.payload]})
        };
      else {
        return state;
      }
    default:
      return state;
  }
};

export default tasksByWeekReducer;
