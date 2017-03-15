const tasksByWeekReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TASKS_BY_WEEK':
      return action.payload;
    case 'ADD_TASKS_BY_WEEK':
      if(state.unfinishTaskByWeek[action.payload] !== undefined) {
        return {
          finishTaskByWeek: state.finishTaskByWeek,
          unfinishTaskByWeek:
            Object.assign(
              {},
              state.unfinishTaskByWeek,
              {[action.payload]: ++state.unfinishTaskByWeek[action.payload]}
            )
          };
      } else {
        return state;
      }
    case 'UPDATE_TASK_BY_WEEK':
     const {date, status, remove} = action.payload;
      if (status === 'finish') {
        let finishTaskUpdate = {}, unfinishtaskUpdate = {};
        if(remove) {
          finishTaskUpdate = {[date]: --state.finishTaskByWeek[date]};
        } else {
          finishTaskUpdate = {[date]: ++state.finishTaskByWeek[date]};
          unfinishtaskUpdate = {[date]: --state.unfinishTaskByWeek[date]};
        }
        return {
          finishTaskByWeek:
            Object.assign({}, state.finishTaskByWeek, finishTaskUpdate),
          unfinishTaskByWeek:
            Object.assign({}, state.unfinishTaskByWeek, unfinishtaskUpdate)
        };
      } else {
        let finishTaskUpdate = {}, unfinishtaskUpdate = {};
        if(remove) {
          unfinishtaskUpdate = {[date]: --state.unfinishTaskByWeek[date]};
        } else {
          finishTaskUpdate = {[date]: --state.finishTaskByWeek[date]};
          unfinishtaskUpdate = {[date]: ++state.unfinishTaskByWeek[date]}
        }
        return {
          finishTaskByWeek:
            Object.assign({}, state.finishTaskByWeek, finishTaskUpdate),
          unfinishTaskByWeek:
            Object.assign({}, state.unfinishTaskByWeek, unfinishtaskUpdate)
        };
      }
    default:
      return state;
  }
};

export default tasksByWeekReducer;
