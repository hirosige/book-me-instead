import React from 'react';
import { withRouter } from 'react-router-dom'
import { logout } from '../utils/AuthService';
import Loading from './Loading';


class Logout extends React.Component {
  async componentWillMount() {
    logout()
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.props.history.replace('/')
  }

  render() {
    return (
      <Loading />
    )
  }
}

export default withRouter(Logout)