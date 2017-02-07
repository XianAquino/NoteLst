export const updateLoginStatus = (loginStatus) => {
  return {
    type: 'UPDATE_LOGIN_STATE',
    payload: loginStatus
  };
};
