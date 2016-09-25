export default (state = {}, action) => {
  switch (action.type) {
    case 'CLEAR':
      return {};
    case 'SET_TEMPLATE_FILE':
      return {
        ...state,
        templateFile: action.file
      };
    case 'RESET_TEMPLATE_FILE':
      return {
        ...state,
        templateFile: undefined
      };
    case 'SET_DATA_FILE':
      return {
        ...state,
        dataFile: action.file
      };
    case 'RESET_DATA_FILE':
      return {
        ...state,
        dataFile: undefined
      };
    default:
      return state;
  }
};
