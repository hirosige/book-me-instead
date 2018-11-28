import React from 'react';
import { Redirect } from 'react-router-dom';
import Lock from './Lock';
import { isLoggedIn } from '../../utils/AuthService';

const Login = (props) => (
  isLoggedIn() ? (
    <Redirect to={{
      pathname: '/dashboard',
      state: { from: props.location }
    }} />
  ) : (
    <Lock location={props.location} />
  )
)

export default Login;