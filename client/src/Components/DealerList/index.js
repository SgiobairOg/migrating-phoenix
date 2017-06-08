/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/8/17.
 *
 * No license is granted for this project.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './DealerList.css';

class DealerList extends Component {
  constructor(props) {
    super(props);
    this.state = { isEligible: this.props.eligibility };
  }
  
  render() {
    const listClasses = classnames({
      DealerList: true,
      'DealerList--Eligible': this.state.isEligible
    });
    return (
      <table className={listClasses}>
        <th><td>Dealer Code</td><td>Dealer Name</td></th>
      </table>
    );
  }
}

DealerList.propTypes = {
  eligibility: PropTypes.bool.isRequired
};

export default DealerList;