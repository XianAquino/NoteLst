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

export const updateTask = (task) => {
  return {
    type: 'UPDATE_TASK',
    payload: task
  };
};

export const deleteTask = (taskId) => {
  return {
    type: 'DELETE_TASK',
    payload: taskId
  };
};
