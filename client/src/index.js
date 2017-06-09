import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './Components/App';
//import routes from './routes';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = configureStore;

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
