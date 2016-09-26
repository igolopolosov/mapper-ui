import React from 'react';
import {connect} from 'react-redux';
import {saveAs} from 'file-saver';

import Progress from './Progress';

const App = ({upload}) => {
  switch (upload.state) {
    case 'UPLOAD':
      return (
        <div>
          <Progress label='Upload' progress={upload.progress} />
          <Progress label='Download' progress={0.0} />
        </div>
      );
    case 'DOWNLOAD':
      return (
        <div>
          <Progress label='Upload' progress={1.0} />
          <Progress label='Download' progress={upload.progress} />
        </div>
      );
    case 'FINISHED':
      return (
        <div>
          :)
          <button onClick={e => {
            e.preventDefault();
            saveAs(upload.data, "documents.zip");
          }}>
            Save
          </button>
        </div>
      );
    default:
      return (
        <div>
          :(
          {upload.error}
        </div>
      );
  }
};

export default connect(
  state => ({
    upload: state.upload
  })
)(App);
