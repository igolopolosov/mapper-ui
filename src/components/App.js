import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Header from './Header';
import Home from './Home';
import About from './About';
import FAQ from './FAQ';

const App = ({children, location}) => (
  <div>
    <Header />
    <ReactCSSTransitionGroup
      transitionName='example'
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>

      {React.cloneElement(children, {
        key: location.pathname
      })}

    </ReactCSSTransitionGroup>
  </div>
);

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About} />
      <Route path="faq" component={FAQ} />
    </Route>
  </Router>
);
