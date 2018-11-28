import React from 'react'
import Country from './components/Country/Country';
import CreateCountry from './components/Country/CreateCountry';
import Dashboard from './components/Dashboard';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Posts from './components/Posts';
import Callback from './components/Auth/Callback';
import NotFound from './components/Error/NotFound';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Forbidden from './components/Error/Forbidden';
import FetchMore from './components/Country/FetchMore';

const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/callback' component={Callback} />
      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />
      <Route path='/posts' component={Posts} />
      <Route exact path='/fetch' component={FetchMore} />
      <Route exact path='/countries' component={Country} />
      <Route path='/countries/new' component={CreateCountry} />
      <Route exact path='/forbidden' component={Forbidden} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default AppRoutes