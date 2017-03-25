export const loadSearchedGroups = (groups) => {
  return {
    type: 'LOAD_SEARCH_GROUPS',
    payload: groups
  };
};

export const removeSearchedGroup = (groupId) => {
  return {
    type: 'REMOVE_SEARCH_GROUPS',
    payload: groupId
  };
};
