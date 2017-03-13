const format = {
  toDate: (date) => (
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  ),
  toTime: (date) => (
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  )
};

export default format;
