import React from 'react'
import Countries from './components/Country/Countries';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Callback from './components/Auth/Callback';
import NotFound from './components/Error/NotFound';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Forbidden from './components/Error/Forbidden';

const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/callback' component={Callback} />
      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />
      <Route exact path='/countries' component={Countries} />
      <Route exact path='/forbidden' component={Forbidden} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default AppRoutes