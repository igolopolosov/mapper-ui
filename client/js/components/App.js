import React from 'react';

import Header from './Header';
import InputForm from './InputForm';

export default () => (
  <div>
    <Header />
    <InputForm endpoint="http://localhost:9090/map" />
  </div>
);
