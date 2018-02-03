import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Menu from './components/Menu';
import externalstyles from './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom'

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
      <BrowserRouter>
      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Menu />
        </MuiThemeProvider>

      </div>
      </BrowserRouter>
    );
  }
}

export default App;