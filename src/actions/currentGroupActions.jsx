export const loadGroupInfo = (group) => {
  return {
    type: 'LOAD_GROUP_INFO',
    payload: group
  };
};

export const loadGroupMembers = (members) => {
  return {
    type: 'LOAD_MEMBERS',
    payload: members
  };
};

export const addNewMember = (user) => {
  return {
    type: 'ADD_MEMBER',
    payload: user
  };
};
