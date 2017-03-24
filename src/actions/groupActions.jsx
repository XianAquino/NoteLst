export const loadGroups = (groups) => {
  return {
    type: 'LOAD_GROUPS',
    payload: groups
  };
};

export const addGroup = (group) => {
  return {
    type: 'ADD_GROUP',
    payload: group
  };
};

export const deleteGroup = (groupId) => {
  return {
    type: 'DELETE_GROUP',
    payload: groupId
  };
};
