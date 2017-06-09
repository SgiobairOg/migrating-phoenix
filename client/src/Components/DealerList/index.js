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
import { connect } from 'react-redux';
import fetch from 'whatwg-fetch';
import './DealerList.css';
import consts from '../../consts';

class DealerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEligible: this.props.eligibility,
      dealers: []
    };
  }
  
  componentDidMount () {
    fetch(`${consts.API_URL}/dealers`)
      .then( (response) => {
        return response.json()
      }).then( (json) => {
        this.setState({dealers: json})
      }).catch( (err) => {
        console.log('No dealers found: ', err );
      })
  }
  
  
  render() {
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
        {this.state.dealers.map(dealer =>
          <li className={listItemClasses} key={dealer.DealerID}>
            {dealer.DealerName}
          </li>
        )}
      </ul>
    );
  }
}

DealerList.propTypes = {
  eligibility: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    dealers: state.dealers
  };
};

export default connect(mapStateToProps)(DealerList);