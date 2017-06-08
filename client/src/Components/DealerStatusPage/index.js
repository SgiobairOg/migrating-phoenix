/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/8/17.
 *
 * No license is granted for this project.
 */
import React, { Component } from 'react';
import DealerList from '../DealerList/index';
import './DealerStatusPage.css';
import '../DealerList';

class DealerStatusPage extends Component {
  render() {
    return (
      <div className="DealerStatusPage">
        <h1>Dealer Status</h1>
        <h2>Eligible Dealer List</h2>
        <DealerList isEligible="true" />
        <h2>Ineligible Dealer List</h2>
        <DealerList isEligible="false" />
      </div>
    );
  }
}

export default DealerStatusPage;