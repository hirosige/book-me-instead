import React from 'react'
import Loading from '../components/Loading';
import { withRouter } from 'react-router-dom'
import { isLoggedIn, isAuthorized } from '../utils/AuthService';
import OnlyTitleNav from '../components/OnlyTitleNav'

const WithProxy = (WrappedComponent) => {
  class HOC extends React.Component {
    constructor () {
      super()

      this.state = {
        isAuthorized: false,
        me: null
      }
    }

    async componentDidMount() {
      if (isLoggedIn()) {
        this.setState({ isAuthorized: true })
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.props.history.replace('/login')
      }
    }

    async componentWillMount() {
      if (!(await isAuthorized())) {
        this.props.history.replace('/forbidden')
      }
    }

    render() {
      if (!isLoggedIn()) {
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
        return <WrappedComponent me={this.state.me} />;
      }
    }
  }

  return withRouter(HOC);
};

export default WithProxy