const tasksByWeekReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TASKS_BY_WEEK':
      return action.payload;
    case 'ADD_TASKS_BY_WEEK':
      if(state.unfinishTaskByWeek[action.payload] !== undefined)
        return {
          finishTaskByWeek: state.finishTaskByWeek,
          unfinishTaskByWeek:
            Object.assign({}, state.unfinishTaskByWeek, {[action.payload]: ++state.unfinishTaskByWeek[action.payload]})
        };
      else {
        return state;
      }
    case 'UPDATE_TASK_BY_WEEK':
     const {date, status} = action.payload;
      if (status === 'finish') {
        return {
          finishTaskByWeek:
            Object.assign({}, state.finishTaskByWeek, {[date]: ++state.finishTaskByWeek[date]}),
          unfinishTaskByWeek:
            Object.assign({}, state.unfinishTaskByWeek, {[date]: --state.unfinishTaskByWeek[date]})
        };
      } else {
        return {
          finishTaskByWeek:
            Object.assign({}, state.finishTaskByWeek, {[date]: --state.finishTaskByWeek[date]}),
          unfinishTaskByWeek:
            Object.assign({}, state.unfinishTaskByWeek, {[date]: ++state.unfinishTaskByWeek[date]})
        };
      }
    default:
      return state;
  }
};

export default tasksByWeekReducer;
