import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import DealerStatusPage from './Components/DealerStatusPage/index';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Dealer Migration Tool</h2>
        </div>
        <Router>
          <Route exact path="/" component={DealerStatusPage}/>
        </Router>
      </div>
    );
  }
}

export default App;
