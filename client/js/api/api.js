// const url='http://localhost:9090/map';
const url='https://mapper-konig-hack.herokuapp.com/map';

export const sendData = (readyTpl, readyData, onComplete) => {
  let xhr = new XMLHttpRequest();

  xhr.upload.onprogress = event => {
    console.log('Upload progress: ', event.loaded + ' / ' + event.total);
  }

  xhr.onprogress = event => {
    console.log('Download progress: ', event.loaded + ' / ' + event.total);
  }

  xhr.onload = xhr.onerror = () => {
    console.log(xhr);
    if (xhr.status == 200) {
      console.log("OK")
      onComplete(true);
    }
    else {
      console.log("Error");
      onComplete(false);
    }
  }

  xhr.open("POST", url, true);
  const formData = new FormData();
  formData.set('tpl', readyTpl, readyTpl.name);
  formData.set('dict', readyData, readyData.name);
  xhr.send(formData);
};
