const defaultState = {
  passwordMatch: true,
  userExist: true,
}

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CORRECT_PASSWORD':
      return {...defaultState, ...{passwordMatch: action.payload}};
    case 'USER_EXIST':
      return {...defaultState, ...{userExist: action.payload}};
    default:
      return state;
  }
}

export default loginReducer;
