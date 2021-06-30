import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Total from '../pages/Total';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/total" component={Total} />
  </Switch>
);

export default Routes;
