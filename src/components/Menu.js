import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Router, withRouter, Route } from "react-router";
import About from '../views/About';
import AllServices from '../views/allServices';
import MyChannels from '../views/myChannels';
import MyShows from '../views/myShows';

let styles;

class Menu extends React.Component {
  
  constructor(props) {
    super(props);
    this.navigateToServices = this.navigateToServices.bind(this);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});
  
  navigateToServices = () => {
    this.props.router.push("/compare");
  };

  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Toolbar style={styles.barStyle}>
        <ToolbarGroup>
          <ToolbarTitle text="Cable Cutters" />
          <ToolbarSeparator />
          <FlatButton 
              style={styles.buttonStyle} 
              label="About this App"
              onClick={() => {
                
              }} 
              primary={true} />
          <FlatButton 
              style={styles.buttonStyle} 
              label="Compare All services" 
              onClick={() => {
                this.navigateToServices;
              }}
              primary={true} />
          <FlatButton 
              style={styles.buttonStyle} 
              label="My Channel Lineup" 
              onClick={() => {

              }}
              primary={true} />
          <FlatButton 
              style={styles.buttonStyle}
              onClick={() => {

              }} 
              label="My Shows" 
              primary={true} />
        </ToolbarGroup>
      </Toolbar>
        </MuiThemeProvider>

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

export default withRouter(Menu);