import React from 'react';

class MyShows extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }
  
  render() {
    return (
      <div>
        <h1>Filtering by show is coming soon!</h1>
        <h1>Please stay tuned.</h1>

      </div>
    );
  }
}

export default MyShows;