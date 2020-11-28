import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CreateUser from './pages/CreateUser';
import Landing from './pages/Landing';
import Profile from './pages/Profile';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/create" component={CreateUser} />
        <Route path={['/profile/:userId']} component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
