import React from 'react'
import { branch, renderComponent } from 'recompose';
import { isLoggedIn } from '../utils/AuthService';
import { Redirect } from 'react-router'

const withAuthentication = () => WrappedComponent => {

  return branch(
    () => !isLoggedIn(),
    renderComponent(({ location }) =>
      <Redirect to={{
        pathname: '/login',
        state: { from: location }
      }} />
    )
  )(WrappedComponent)
}

export default withAuthentication