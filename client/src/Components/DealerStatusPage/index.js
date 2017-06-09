/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/8/17.
 *
 * No license is granted for this project.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DealerList from '../DealerList/index';
import { connect } from 'react-redux';
//import * as dealerActions from '../../Actions/dealerActions';
import './DealerStatusPage.css';
import '../DealerList';

class DealerStatusPage extends Component {
  render() {
    return (
      <div className="DealerStatusPage">
        <h1>Dealer Status</h1>
        <h2>Eligible Dealer List</h2>
        <DealerList dealers={this.props.dealers} isEligible={true} />
        <h2>Ineligible Dealer List</h2>
        <DealerList dealers={this.props.dealers} isEligible={false} />
      </div>
    );
  }
}

DealerStatusPage.propTypes = {
  dealers: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    dealers: state.dealers
  };
};

export default connect(mapStateToProps)(DealerStatusPage);