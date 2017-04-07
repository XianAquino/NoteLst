export const checkPassword = (pwd, confirmPwd) => ({
  type: 'PASSWORD_MATCH',
  payload: {
    passwordMatch: pwd === confirmPwd
  }
});
