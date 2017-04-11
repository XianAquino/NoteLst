export const checkCorrectPwd = (match) => (
  {
    type: 'CORRECT_PASSWORD',
    payload: match
  }
);

export const userExist = (exist) => (
  {
    type: 'USER_EXIST',
    payload: exist
  }
);
