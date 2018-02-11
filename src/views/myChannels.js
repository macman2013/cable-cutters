import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

let styles;

class MyChannels extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }
  
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <h1>My Channels</h1>
        <h1>My Channels</h1>
        <h1>My Channels</h1>
        <h1>My Channels</h1>
        </MuiThemeProvider>

      </div>
    );
  }
}

styles = {
  
};

export default MyChannels;