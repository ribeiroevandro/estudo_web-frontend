import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import CreateUser from './pages/CreateUser';
import Profile from './pages/Profile';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/create" component={CreateUser} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;