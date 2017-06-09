/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/9/17.
 *
 * No license is granted for this project.
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dealerReducer(state = initialState.dealers, action) {
  switch(action.type) {
    case types.LOAD_DEALERS_SUCCESS:
      return action.dealers
    default:
      return state;
  }
}