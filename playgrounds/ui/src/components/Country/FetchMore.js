import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const QUERY = gql`
  query AllCountries(
    $first: Int!
    $skip: Int!
  ) {
    allCountries(
      filter: {
        first: $first
        skip: $skip
      }
    ) {
      id
      name
      code
      slug
    }
  }
`;

class FetchMore extends Component {
  render () {
    console.log(this.props)

    return (
      <div>Test</div>
    )
  }
}

export default graphql(
  QUERY,
  {
    options: {
      variables: {
        first: 10,
        skip: 0
      }
    }
  })(FetchMore);