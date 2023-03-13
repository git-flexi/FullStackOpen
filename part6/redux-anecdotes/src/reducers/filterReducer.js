const filterReducer = (state = '', action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'FILTER_CHANGE':
      return action.payload;
    default:
      return state;
  }
};

export const changeFilter = (filter) => {
  return {
    type: 'FILTER_CHANGE',
    payload: filter,
  };
};

export default filterReducer;