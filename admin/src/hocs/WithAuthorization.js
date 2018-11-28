import React from 'react'
import { branch, renderComponent } from 'recompose';
import { Redirect } from 'react-router'

const withAuthorization = () => WrappedComponent => {

  return branch(
    ({ me, }) => me && !(me.role === 'ADMIN'),
    renderComponent(({ location }) =>
      <Redirect to={{
        pathname: '/forbidden',
        state: { from: location }
      }} />
    )
  )(WrappedComponent)
}

export default withAuthorization