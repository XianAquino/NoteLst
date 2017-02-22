export const loadSearchResult = (users) => {
  return {
    type: 'LOAD_SEARCH_RESULTS',
    payload: users
  };
};

export const clearResult = () => {
  return {
    type: 'CLEAR_SEARCH_RESULTS',
  };
};
