export const loadSearchedGroups = (groups) => {
  return {
    type: 'LOAD_SEARCH_GROUPS',
    payload: groups.filter(group => !group.member)
  };
};

export const removeSearchedGroup = (groupId) => {
  return {
    type: 'REMOVE_SEARCH_GROUPS',
    payload: groupId
  };
};
