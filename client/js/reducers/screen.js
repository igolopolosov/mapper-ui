export default (state = {id: 'HOME'}, action) => {
  switch (action.type) {
    case 'SET_SCREEN':
      return {
        id: action.id
      };
    default:
      return state;
  }
};
