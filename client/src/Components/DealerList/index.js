/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/8/17.
 *
 * No license is granted for this project.
 */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './DealerList.css';

const DealerList = ({dealers}, props) => {
  
  const listClasses = classnames({
    DealerList: true,
    'DealerList--Eligible': props.isEligible
  });
  
  const listItemClasses = classnames({
    DealerList__Item: true,
    'DealerList__Item--Eligible': props.isEligible
  });
  console.log('Dealers: ', dealers.length);
  return (
    <ul className={listClasses}>
      
      {
        dealers.map(dealer =>
        <li className={listItemClasses} key={dealer.DealerID}>
          {dealer.DealerName}
        </li>
      )}
    </ul>
  );
};

DealerList.propTypes = {
  dealers: PropTypes.array.isRequired,
  isEligible: PropTypes.bool.isRequired
};

export default DealerList;