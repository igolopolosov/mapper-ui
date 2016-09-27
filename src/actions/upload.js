export const resetUpload = () => ({
  type: 'RESET_UPLOAD'
});

export const updateUploadProgress = progress => ({
  type: 'UPDATE_UPLOAD_PROGRESS',
  progress
});

export const updateDownloadProgress = progress => ({
  type: 'UPDATE_DOWNLOAD_PROGRESS',
  progress
});

export const finishUpload = data => ({
  type: 'FINISH_UPLOAD',
  data
});

export const error = error => ({
  type: 'ERROR',
  error
});
