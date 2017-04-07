export const checkPassword = (pwd, confirmPwd) => ({
  type: 'PASSWORD_MATCH',
  payload: pwd === confirmPwd
});

export const usernameValidity = (usernameExist) => ({
  type: 'USERNAME_AVAILABILITY',
  payload: usernameExist
});

export const showPassword = (show) => ({
  type: 'SHOW_PASSWORD',
  payload: show
});
