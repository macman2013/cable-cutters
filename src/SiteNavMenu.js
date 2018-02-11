import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import Home from './views/Home';
import AllServices from './views/allServices';
import About from './views/About';
import MyChannels from './views/myChannels';
import MyShows from './views/myShows';

let styles;

class SiteNavMenu extends Component {
  render() {
    return (
        <div className='App-content'>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Toolbar style={styles.barStyle}>
            <ToolbarGroup>
              <ToolbarTitle text="Cable Cutters" />
              <ToolbarSeparator />
              <FlatButton containerElement={<Link to={"/about"} />}
                  style={styles.buttonStyle} 
                  label="About this App"
                  onClick={() => {

                  }} 
                  primary={true} />
              <FlatButton containerElement={<Link to={"/compare"} />}
                  style={styles.buttonStyle} 
                  label="Compare All services" 
                  onClick={() => {

                  }}
                  primary={true} />
              <FlatButton containerElement={<Link to={"/channels"} />}
                  style={styles.buttonStyle} 
                  label="My Channel Lineup" 
                  onClick={() => {
                    
                  }}
                  primary={true} />
              <FlatButton containerElement={<Link to={"/shows"} />}
                  style={styles.buttonStyle}
                  onClick={() => {
                    
                  }} 
                  label="My Shows" 
                  primary={true} />
            </ToolbarGroup>
            </Toolbar>
            </MuiThemeProvider>

          <Route exact={true} path="/" component={Home}/>
          <Route exact={true} path="/compare" component={AllServices}/>
          <Route exact={true} path="/channels" component={MyChannels}/>
          <Route exact={true} path="/shows" component={MyShows}/>
          <Route exact={true} path="/about" component={About}/>
        </div>
      );
    }
  }

  styles = {
    barStyle: {
      backgroundColor: '#222',
      position: 'fixed',
      top: '0',
      zIndex: '1000',
      width: '100%',
    },
    buttonStyle: {
      color: '#fff',
    },
  };

export default SiteNavMenu;