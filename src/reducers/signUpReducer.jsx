const defaultState = {
  passwordMatch: true,
  showPassword: false,
  usernameAvailable: true
};

const signUpReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'PASSWORD_MATCH':
      return {...state, ...{passwordMatch: action.payload}};
    case 'USERNAME_AVAILABILITY':
      return {...defaultState, ...{usernameAvailable: action.payload}};
    case 'SHOW_PASSWORD':
      return {...state, ...{showPassword: action.payload}};
    default:
      return state;
  }
}

export default signUpReducer;
