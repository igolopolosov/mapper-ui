import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route, IndexRoute, Redirect} from "react-router";
import App from './App';

let routes = (
    <Route path="/" component={App} />
);

ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('root'));
