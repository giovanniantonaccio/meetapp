import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Details from '../pages/Details';
import Meetup from '../pages/Meetup';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/details" component={Details} isPrivate />
      <Route path="/meetup" component={Meetup} isPrivate />

      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={SignIn} />
    </Switch>
  );
}
