import React from 'react'
import { GraphQLClient } from 'graphql-request'
import Loading from '../components/Loading';
import { withRouter } from 'react-router-dom'
import { isLoggedIn, getDecodedGraphcoolToken } from '../utils/AuthService';
import OnlyTitleNav from '../components/OnlyTitleNav'

const WithProxy = (WrappedComponent) => {

  const client = new GraphQLClient(process.env.REACT_APP_GRAPHCOOL_SIMPLE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GRAPHCOOL_API_KEY}`,
    },
  })

  class HOC extends React.Component {
    constructor () {
      super()

      this.state = {
        isAuthorized: false,
        me: null
      }
      this.setMe()
    }

    async setMe() {
      const { userId } = getDecodedGraphcoolToken()

      const userQuery = `{
        User(id: "${ userId }") {
          id
          email
          role
        }
      }`

      await client.request(userQuery)
        .then(async user => {
          console.log(user)
          await this.setState({ me: user })
        })
    }

    async componentDidMount() {
      await new Promise(resolve => setTimeout(resolve, 300))

      if (isLoggedIn()) {
        await this.setState({ isAuthorized: true })
      } else {
        this.props.history.replace('/login')
      }
    }

    render() {
      if (!this.state.isAuthorized && !this.state.me) {
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