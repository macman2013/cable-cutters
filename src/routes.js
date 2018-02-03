import React from 'react'
import { Switch, Route } from 'react-router-dom'
import About from './views/About';
import AllServices from './views/allServices';
import MyChannels from './views/myChannels';
import MyShows from './views/myShows';

const Routes = () => (
    <routes>
      <Switch>
        <Route exact path='/' component={About}/>
        <Route path='/compare' component={AllServices}/>
        <Route path='/channels' component={MyChannels}/>
        <Route path='/shows' component={MyShows}/>
      </Switch>
    </routes>
  )
  
export default Routes