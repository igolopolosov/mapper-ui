import React from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import InputForm from './InputForm';
import UploadStats from './UploadStats';

const App = ({uploadState}) => (
  <div>
    <Header />
    {uploadState === undefined ? <InputForm /> : <UploadStats />}
  </div>
);

export default connect(
  state => ({
    uploadState: state.upload.state
  })
)(App);
