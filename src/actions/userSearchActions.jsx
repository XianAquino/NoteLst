export const loadSearchResult = (users) => {
  return {
    type: 'LOAD_SEARCH_RESULTS',
    payload: users
  };
};
