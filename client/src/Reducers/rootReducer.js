/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/9/17.
 *
 * No license is granted for this project.
 */
import {combineReducers} from 'redux';
import dealers from './dealerReducer';

const rootReducer = combineReducers({
  // short hand property names
  dealers
})

export default rootReducer;