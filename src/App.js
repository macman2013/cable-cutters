import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import externalstyles from './App.css';

let styles;

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
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
          <FlatButton style={styles.buttonStyle} label="About this App" primary={true} />
          <FlatButton style={styles.buttonStyle} label="Compare services" primary={true} />
          <FlatButton style={styles.buttonStyle} label="My Channel Lineup" primary={true} />
          <FlatButton style={styles.buttonStyle} label="My Shows" primary={true} />
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

export default App;