import React from 'react';
import Dropzone from 'react-dropzone';

class FileInput extends React.Component {

  render() {
    const {label} = this.props;
    return (
      <div>
        <Dropzone
          onDrop={this.onFileDrop.bind(this)}>
          <div>{label}</div>
        </Dropzone>
      </div>
    );
  }
}

export default FileInput;
