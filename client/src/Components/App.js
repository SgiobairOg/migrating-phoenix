import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import './App.css';
import Main from '../routes';
//import DealerStatusPage from './Components/DealerStatusPage/index';

class App extends Component {
  render() {
    return (
      <div className="app__container">
        <div className="app__header">
          <h1>Dealer Migration Tool</h1>
        </div>
        <Main/>
      </div>
    );
  }
}

export default App;
