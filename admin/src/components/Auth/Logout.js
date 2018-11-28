import React from 'react';
import { withRouter } from 'react-router-dom'
import { logout } from '../../utils/AuthService';
import Loading from '../Loading';
import OnlyTitleNav from '../OnlyTitleNav'

class Logout extends React.Component {
  async componentWillMount() {
    logout()
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.props.history.replace('/login')
  }

  render() {
    return (
      <div>
        <OnlyTitleNav title="BOOK ME INSTEAD. LOGOUT" />
        <Loading />
      </div>
    )
  }
}

export default withRouter(Logout)