/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/9/17.
 *
 * No license is granted for this project.
 */
import React from 'react';
import {Switch, Route } from 'react-router-dom';
import DealerStatusPage from './Components/DealerStatusPage';
import DealerDetailsPage from './Components/DealerDetailsPage';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={DealerStatusPage}>
        <Route path="/dealers/:id" component={DealerDetailsPage} />
      </Route>
    </Switch>
  </main>
);

export default Main;