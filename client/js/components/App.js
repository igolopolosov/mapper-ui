import React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './Header';
import InputForm from './InputForm';
import About from './About';
import FAQ from './FAQ';

// <ReactCSSTransitionGroup
//   transitionName="example"
//   transitionEnterTimeout={50000}
//   transitionLeaveTimeout={30000}>

const App = ({screen}) => (
  <div>
    <Header />

      {screen == 'HOME' ? <InputForm key='HOME' /> : ''}

      {screen == 'ABOUT' ? <About key='ABOUT' /> : ''}

      {screen == 'FAQ' ? <FAQ key='FAQ' /> : ''}

  </div>
);
// </ReactCSSTransitionGroup>

export default connect(
  state => ({
    screen: state.screen.id
  })
)(App);
