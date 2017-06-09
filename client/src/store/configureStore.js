/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/9/17.
 *
 * No license is granted for this project.
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(
    applyMiddleware(thunk)
  );
}