import React from 'react'
import Loading from '../components/Loading';
import { withRouter } from 'react-router-dom'
import { isLoggedIn } from '../utils/AuthService';
import OnlyTitleNav from '../components/OnlyTitleNav'

const WithProxy = (WrappedComponent) => {
  class HOC extends React.Component {
    constructor () {
      super()

      this.state = {
        isAuthorized: false
      }
    }

    async componentDidMount() {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (isLoggedIn()) {
        await this.setState({ isAuthorized: true })
      } else {
        this.props.history.replace('/login')
      }
    }

    render() {
      if (!this.state.isAuthorized) {
        return (
          <div>
            <OnlyTitleNav title="BOOK ME INSTEAD. APP PROXY" />
            <div className="notification is-primary" style={{
              borderRadius: 0,
              marginBottom: 0,
              position: "fixed",
              width: "100%",
              top: 50
            }}>
              This page protext your safety! direct you to the destination!
            </div>
            <Loading />
          </div>
        )
      } else {
        return <WrappedComponent />;
      }
    }
  }

  return withRouter(HOC);
};

export default WithProxy