import moment from 'moment';

const dateToMonthandDay = (date) => {
  return moment(date).format('MMM DD')
};

export const loadTasksByWeek = (tasks) => {

  let timeline = {
    finishTaskByWeek: {},
    unfinishTaskByWeek: {}
  };

  for(let i = 7 ; i >= 0; i--) {
    let date = new Date();
    date = date.setDate(date.getDate() - i);
    timeline.finishTaskByWeek[dateToMonthandDay(date)] = 0;
    timeline.unfinishTaskByWeek[dateToMonthandDay(date)] = 0;
  }

  tasks.forEach( task => {
    if(task.finish) {
      timeline.finishTaskByWeek[dateToMonthandDay(task.date)]++;
    } else {
      timeline.unfinishTaskByWeek[dateToMonthandDay(task.date)]++;
    }
  });

  return {
    type: 'LOAD_TASKS_BY_WEEK',
    payload: timeline
  };
};
