import React from 'react'
import { getMe } from '../utils/AuthService'

const withUser = () => WrappedComponent => {
  const WithUser = props => {
    return (
      <WrappedComponent {...props} me={getMe()} />
    )
  }

  return WithUser
}

export default withUser