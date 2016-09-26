// const url='http://localhost:9090/map';
const url='https://mapper-konig-hack.herokuapp.com/map';

export const sendData = (readyTpl, readyData, onUploadProgress, onDownloadProgress, onComplete) => {
  let xhr = new XMLHttpRequest();

  xhr.upload.onprogress = event => {
    console.log('Upload progress: ', event.loaded + ' / ' + event.total);
    onUploadProgress(event.loaded / event.total);
  }

  xhr.onprogress = event => {
    console.log('Download progress: ', event.loaded + ' / ' + event.total);
    onDownloadProgress(event.loaded / event.total);
  }

  xhr.onload = xhr.onerror = () => {
    console.log(xhr);
    if (xhr.status == 200) {
      console.log("OK");      
      onComplete({
        data: xhr.response
      });
    }
    else {
      console.log("Error");
      onComplete({
        error: xhr.response || 'Response status: ' + xhr.status
      });
    }
  }

  xhr.open("POST", url, true);
  xhr.responseType = "blob";
  const formData = new FormData();
  formData.set('tpl', readyTpl, readyTpl.name);
  formData.set('dict', readyData, readyData.name);
  xhr.send(formData);
};
