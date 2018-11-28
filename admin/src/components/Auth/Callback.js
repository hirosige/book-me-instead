import React, { Component } from 'react';

import {
  setIdToken,
  setAccessToken,
  getAccessToken,
  setGraphCoolToken,
  getGraphcoolUser,
  setGraphCoolUser,
  getMe,
} from '../../utils/AuthService';

import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../Loading';
import OnlyTitleNav from '../OnlyTitleNav'

class Callback extends Component {
  async componentDidMount() {
    setAccessToken();
    setIdToken();

    const result = await this.props.createGraphcoolUser(
      { variables: { accessToken: getAccessToken(), }}
    )

    setGraphCoolToken(result.data.authenticateUser.token)

    const user = await getGraphcoolUser()
    setGraphCoolUser(user)

    console.log('me', getMe())

    this.props.history.replace('/dashboard')
  }

  render() {
    return (
      <div>
        <OnlyTitleNav title="BOOK ME INSTEAD. ALMOST THERE" />
        <Loading />
      </div>
    )
  }
}

const CREATE_GRAPHCOOL_USER = gql`
  mutation CreateGraphcoolUser($accessToken: String!) {
    authenticateUser(accessToken: $accessToken) {
      id
      token
    }
  }
`

const CreatePageWithMutation = graphql(CREATE_GRAPHCOOL_USER, {name: 'createGraphcoolUser'})(Callback)
export default withRouter(CreatePageWithMutation)