import React, { Component } from 'react';
import './App.css';
import CommentBox from './CommentBox';
import SiteNavMenu from './SiteNavMenu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SiteNavMenu />
        <p className="App-intro">
          
        </p>
        {/* <CommentBox
        url='http://localhost:3001/api/comments'
        pollInterval={2000} /> */}
      </div>
    );
  }
}

export default App;
