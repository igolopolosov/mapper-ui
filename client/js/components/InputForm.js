import React from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';

import * as uploadActions from '../actions/upload';
import * as formActions from '../actions/form';
import FileStatus from './FileStatus';
import * as api from '../api/api';

const templateFiletypes = [
  'docx'
];
const dataFiletypes = [
  'csv', 'json'
];

class InputForm extends React.Component {
  checkFiletype(filename, types) {
    return undefined !== types.find((type) =>
      filename.endsWith(type)
    );
  }

  onFileDrop(files) {
    const {dispatch} = this.props;
    files.forEach((file) => {
      if (this.checkFiletype(file.name, templateFiletypes)) {
        console.log('Template file: ', file);
        dispatch(formActions.setTemplateFile(file));
      }
      else if (this.checkFiletype(file.name, dataFiletypes)) {
        console.log('Data file: ', file);
        dispatch(formActions.setDataFile(file));
      }
      else {
        console.log('Unknown file type: ', file);
      }
    });
  }

  resetTemplateFile() {
    this.props.dispatch(formActions.resetTemplateFile());
  }

  resetDataFile() {
    this.props.dispatch(formActions.resetDataFile());
  }

  submit() {
    const {templateFile, dataFile, dispatch} = this.props;

    const onUploadProgress = progress =>
      dispatch(uploadActions.updateUploadProgress(progress));
    const onDownloadProgress = progress =>
      dispatch(uploadActions.updateDownloadProgress(progress));
    const onComplete = result => {
      if (result.data !== undefined) {
        dispatch(uploadActions.finishUpload(result.data));
      }
      else {
        dispatch(uploadActions.error(result.error || 'Unknown error'));
      }
      console.log(ok ? ':)' : ':(');
    }

    api.sendData(templateFile, dataFile, onUploadProgress, onDownloadProgress, onComplete);
  }

  dropzoneContent(templateFile, dataFile) {
    const hasTemplate = templateFile !== undefined;
    const hasData = dataFile !== undefined;
    return (
      <div className="dropCircle animated display">

        <div className="noneLoad">
          <div className={hasTemplate ? '' : 'tlpNot'}>
            {hasTemplate
              ? <p>Шаблон:<br/>{templateFile.name}</p>
              : <p>Перетащите<br/>шаблон ({templateFiletypes.join(',')})</p>
            }
          </div>
          <div className={hasData ? '' : 'dictNot'}>
            {hasData
              ? <p>Данные:<br/>{dataFile.name}</p>
              : <p>Перетащите<br/>данные ({dataFiletypes.join(',')})</p>
            }
          </div>
        </div>
     </div>
   );
  }

  render() {
    const {templateFile, dataFile} = this.props;
    const isReadyToSubmit = templateFile !== undefined && dataFile !== undefined;
    return (
      <div>
        <FileStatus file={templateFile} label='Template file: ' reset={this.resetTemplateFile.bind(this)} />
        <FileStatus file={dataFile} label='Data file: ' reset={this.resetDataFile.bind(this)}/>

        <Dropzone
            className='dropCircleWrapper'
            activeClassName='dropCircleWrapperHover'
            onDrop={this.onFileDrop.bind(this)}>
              {this.dropzoneContent(templateFile, dataFile)}
        </Dropzone>

        {isReadyToSubmit
          ? <button onClick={this.submit.bind(this)}>Отправить</button>
          : ''}
      </div>
    );
  }
}

export default connect(
  state => ({
    templateFile: state.form.templateFile,
    dataFile: state.form.dataFile
  })
)(InputForm);
