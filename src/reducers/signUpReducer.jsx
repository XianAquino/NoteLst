const defaultState = {
  passwordMatch: true,
  showPassword: false,
  usernameAvailable: true
};

const signUpReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'PASSWORD_MATCH':
      return {...defaultState, ...action.payload};
    case 'USERNAME_AVAILABILITY':
      return {...defaultState, ...action.payload};
    default:
      return state;
  }
}

export default signUpReducer;
