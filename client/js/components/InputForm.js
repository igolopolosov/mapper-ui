import React from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';

import * as actions from '../actions/dummy';
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
    files.forEach((file) => {
      if (this.checkFiletype(file.name, templateFiletypes)) {
        console.log('Template file: ', file);
        this.props.dispatch(actions.setTemplateFile(file));
      }
      else if (this.checkFiletype(file.name, dataFiletypes)) {
        console.log('Data file: ', file);
        this.props.dispatch(actions.setDataFile(file));
      }
      else {
        console.log('Unknown file type: ', file);
      }
    });
  }

  resetTemplateFile() {
    this.props.dispatch(actions.resetTemplateFile());
  }

  resetDataFile() {
    this.props.dispatch(actions.resetDataFile());
  }

  submit() {
    const {templateFile, dataFile} = this.props;

    const onComplete = ok => alert(ok ? ':)' : ':(');
    // alert('Template file: ' + templateFile.name + '\nData file: ' + dataFile.name);
    api.sendData(templateFile, dataFile, onComplete);
  }

  render() {
    const {templateFile, dataFile} = this.props;
    const isReadyToSubmit = templateFile !== undefined && dataFile !== undefined;
    return (
      <div>
        <FileStatus file={templateFile} label='Template file: ' reset={this.resetTemplateFile.bind(this)} />
        <FileStatus file={dataFile} label='Data file: ' reset={this.resetDataFile.bind(this)}/>

        {isReadyToSubmit
          ? <button onClick={this.submit.bind(this)}>Отправить</button>
          : <Dropzone
            onDrop={this.onFileDrop.bind(this)}>
            <div>
              Drop template file ({templateFiletypes.join(',')})
              and data file ({dataFiletypes.join(',')})
            </div>
          </Dropzone>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    templateFile: state.dummy.templateFile,
    dataFile: state.dummy.dataFile
  })
)(InputForm);
