import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadDealers } from './Actions/dealerActions';
import App from './Components/App';
import configureStore from './Store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = configureStore();

store.dispatch(loadDealers());

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
