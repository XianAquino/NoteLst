export const loadTasks = (tasks) => {
  return {
    type: 'LOAD_TASKS',
    payload: tasks
  };
};

export const addTask = (task) => {
  return {
    type: 'ADD_TASK',
    payload: task
  };
};
