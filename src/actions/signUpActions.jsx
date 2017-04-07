export const checkPassword = (pwd, confirmPwd) => ({
  type: 'PASSWORD_MATCH',
  payload: {
    passwordMatch: pwd === confirmPwd
  }
});

export const usernameValidity = (usernameExist) => ({
  type: 'USERNAME_AVAILABILITY',
  payload: {
    usernameAvailable: usernameExist
  }
});
