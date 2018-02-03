import React from 'react';
import {Router, Route, browserHistory, hashHistory} from 'react-router-3';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <App />
), document.getElementById('root'))
registerServiceWorker();
