import React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './Header';
import Home from './Home';
import About from './About';
import FAQ from './FAQ';

const App = ({screen}) => (
  <div>
    <Header />
    <ReactCSSTransitionGroup
      transitionName='example'
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>

      {screen === 'HOME' ? <Home key='HOME' /> : ''}

      {screen === 'ABOUT' ? <About key='ABOUT' /> : ''}

      {screen === 'FAQ' ? <FAQ key='FAQ' /> : ''}

    </ReactCSSTransitionGroup>
  </div>
);


export default connect(
  state => ({
    screen: state.screen.id
  })
)(App);
