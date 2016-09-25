export default (state = {}, action) => {
  switch (action.type) {
    case 'RESET_UPLOAD':
      return {};
    case 'UPDATE_UPLOAD_PROGRESS':
      return {
        state: 'UPLOAD',
        progress: action.progress
      };
    case 'UPDATE_DOWNLOAD_PROGRESS':
      return {
        state: 'DOWNLOAD',
        progress: action.progress
      };
    case 'FINISH_UPLOAD':
      return {
        state: 'FINISHED',
        data: action.data
      };
    case 'ERROR':
      return {
        state: 'ERROR',
        error: action.errog
      };
    default:
      return state;
  }
};
