import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

let styles;

class About extends React.Component {
  
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
        <h1>ABOUT</h1>
        <h1>ABOUT</h1>
        <h1>ABOUT</h1>
        <h1>ABOUT</h1>

      </div>
    );
  }
}

styles = {
  
};

export default About;