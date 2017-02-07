const userInfo = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

export default userInfo;
