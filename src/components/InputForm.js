import React from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import {saveAs} from 'file-saver';

import * as uploadActions from '../actions/upload';
import * as formActions from '../actions/form';
import * as api from '../api/api';

const templateFiletypes = [
  'docx'
];
const dataFiletypes = [
  'csv', 'json'
];

const checkFiletype = (filename, types) => {
  return undefined !== types.find((type) =>
    filename.endsWith(type)
  );
}

class InputForm extends React.Component {

  onFileDrop = files => {
    // HACK
    var {templateFile, dataFile} = this.props.form;
    const {dispatch} = this.props;
    files.forEach((file) => {
      if (checkFiletype(file.name, templateFiletypes)) {
        console.log('Template file: ', file);
        templateFile = file;
        dispatch(formActions.setTemplateFile(file));
      }
      else if (checkFiletype(file.name, dataFiletypes)) {
        console.log('Data file: ', file);
        dataFile = file;
        dispatch(formActions.setDataFile(file));
      }
      else {
        console.log('Unknown file type: ', file);
      }
    });

    if (templateFile !== undefined && dataFile !== undefined) {
      this.submit(templateFile, dataFile);
    }
  }

  resetTemplateFile = () => {
    this.props.dispatch(formActions.resetTemplateFile());
  }

  resetDataFile = () => {
    this.props.dispatch(formActions.resetDataFile());
  }

  submit = (templateFile, dataFile) => {
    const {dispatch} = this.props;

    const onUploadProgress = progress =>
      dispatch(uploadActions.updateUploadProgress(progress));
    const onDownloadProgress = progress =>
      dispatch(uploadActions.updateDownloadProgress(progress));
    const onComplete = result => {
      if (result.data !== undefined) {
        saveAs(result.data, "documents.zip");
        dispatch(formActions.clear());
        dispatch(uploadActions.finishUpload(result.data));
      }
      else {
        dispatch(uploadActions.error(result.error || 'Unknown error'));
      }
    }

    api.sendData(templateFile, dataFile, onUploadProgress, onDownloadProgress, onComplete);
  }

  renderStatus = () => {
    const {state, progress} = this.props.upload;
    const percentage = progress ? (progress * 100).toFixed(0) : '';
    switch (state) {
      case 'UPLOAD':
        if (progress < 1) {
          return <div>Отправка... {percentage}%</div>
        }
        else {
          return <div>Обработка...</div>
        }
      case 'DOWNLOAD':
        if (progress > 0) {
          return <div>Загрузка результата... {percentage}%</div>
        }
        else {
          return <div>Обработка...</div>
        }
      default:
        return null;
    }
  }

  dropzoneContent = (templateFile, dataFile) => {
    const uploadState = this.props.upload.state;
    const isLoading = uploadState === 'UPLOAD' || uploadState === 'DOWNLOAD';
    const hasTemplate = templateFile !== undefined;
    const hasData = dataFile !== undefined;
    return (
      <div className="dropCircle animated display">
        <div className={'noneLoad' + (isLoading ? ' blur' : '')}>
          <div className='tlp' style={hasTemplate ? {background: '#477089'} : {}}>
            {hasTemplate
              ? <p>Шаблон:<br/>{templateFile.name}</p>
              : <p>Перетащите<br/>шаблон ({templateFiletypes.join(',')})</p>
            }
          </div>
          <div className='dict' style={hasData ? {background: '#477089'} : {}}>
            {hasData
              ? <p>Данные:<br/>{dataFile.name}</p>
              : <p>Перетащите<br/>данные ({dataFiletypes.join(',')})</p>
            }
          </div>
        </div>
        <div className='status'>
          {this.renderStatus()}
        </div>
     </div>
   );
  }

  render() {
    const {templateFile, dataFile} = this.props.form;
    return (
      <div style={{height: '100vh'}}>
        <Dropzone
            className='dropCircleWrapper'
            activeClassName='dropCircleWrapperActive'
            onDrop={this.onFileDrop}>
              {this.dropzoneContent(templateFile, dataFile)}
        </Dropzone>
      </div>
    );
  }
}

export default connect(
  state => ({
    form: state.form,
    upload: state.upload
  })
)(InputForm);
