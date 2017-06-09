/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/9/17.
 *
 * No license is granted for this project.
 */
import * as types from './actionTypes';
import DealerService from '../Service/dealerService';

export function loadDealers() {
  return function( dispatch ) {
    return DealerService.getAllDealers().then(dealers => {
      dispatch(loadDealersSuccess(dealers));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadDealersSuccess(dealers) {
  return {type: types.LOAD_DEALERS_SUCCESS, dealers};
}