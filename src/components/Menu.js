import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import API from '../API';

let styles;

class Menu extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleChange = (event, index, value) => this.setState({value});

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
                API.changePath('/');
              }} 
              primary={true} />
          <FlatButton 
              style={styles.buttonStyle} 
              label="Compare All services" 
              onClick={() => {
                API.changePath('/compare');
              }}
              primary={true} />
          <FlatButton 
              style={styles.buttonStyle} 
              label="My Channel Lineup" 
              onClick={() => {
                API.changePath('/channels');
              }}
              primary={true} />
          <FlatButton 
              style={styles.buttonStyle}
              onClick={() => {
                API.changePath('/compare');
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

export default Menu;