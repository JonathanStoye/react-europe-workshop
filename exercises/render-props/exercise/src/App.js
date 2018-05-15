import React, { Component } from 'react';
import './App.css';

import Fetch from './Fetch';

class App extends Component {
  render() {
    return (
      <Fetch url="https://api.something.com">
        {
          ({ loading, error, data }) => {
            if (error !== null) {
              return <p>Error: {error}</p>
            }
            return loading === true ? <p>Loading...</p> : <p>{data}</p>
          }
        }
      </Fetch>
    );
  }
}

export default App;
