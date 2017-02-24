export const loadContacts = (users) => {
  return {
    type: 'LOAD_CONTACTS',
    payload: users
  };
};
