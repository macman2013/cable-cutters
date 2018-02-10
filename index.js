import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router-3'
import App from './App'
import About from './views/About';
import Channels from './views/myChannels';
import Shows from './views/myShows';
import Compare from './views/allServices';

render((
  <Router history={hashHistory}>

  <Route component={App}>

    <Route path="/" component={App} />
    <Route path="/about" component={About} />
    <Route path="/compare" component={Compare} />
    <Route path="/channels" component={Channels} />
    <Route path="/shows" component={Shows} />
  </Route>
</Router>
), document.getElementById('app'))
