const defaultState = {
  isLoggedIn: false,
  passwordMatch: true,
  userExist: true,
}

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_LOGIN_STATE':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

export default loginReducer;
