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
import { Link } from 'react-router-dom';
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
    <table className={listClasses}>
      <tbody>
      
      {
        dealers.map(dealer =>
        <tr className={listItemClasses} key={dealer.DealerID}>
          <td><Link to={`/dealer/${dealer.DealerID}`}>{dealer.DealerName}</Link></td>
          <td>{dealer.DealerURL}</td>
          <td>{dealer.CountryCode}</td>
        </tr>
      )}
      
      </tbody>
    </table>
  );
};

DealerList.propTypes = {
  dealers: PropTypes.array.isRequired,
  isEligible: PropTypes.bool.isRequired
};

export default DealerList;