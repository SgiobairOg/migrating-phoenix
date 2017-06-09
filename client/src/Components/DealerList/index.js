/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/8/17.
 *
 * No license is granted for this project.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DealerList.css';

const DealerList = ({dealers}) => {
  
  const listClasses = classnames({
    DealerList: true,
    'DealerList--Eligible': this.state.isEligible
  });
  
  const listItemClasses = classnames({
    DealerList__Item: true,
    'DealerList__Item--Eligible': this.state.isEligible
  });
  
  return (
    <ul className={listClasses}>
      {dealers.map(dealer =>
        <li className={listItemClasses} key={dealer.DealerID}>
          {dealer.DealerName}
        </li>
      )}
    </ul>
  );
};

DealerList.propTypes = {
  dealers: PropTypes.array.isRequired,
  eligibility: PropTypes.bool.isRequired
};

export default DealerList;