const defaultState = {
  passwordMatch: true,
  showPassword: false,
  usernameAvailable: false
};

const signUpReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'PASSWORD_MATCH':
      return {...defaultState, ...action.payload}
    default:
      return state;
  }
}

export default signUpReducer;
