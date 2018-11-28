import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import AppRoutes from './AppRoutes'

import {
  getGraphCoolToken,
} from './utils/AuthService';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHCOOL_SIMPLE_ENDPOINT
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHCOOL_SUBSCRIPTION_ENDPOINT,
  options: {
    reconnect: true,
    connectionParams: {
        Authorization: getGraphCoolToken() ? `Bearer ${getGraphCoolToken()}` : "",
    },
  }
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getGraphCoolToken() ? `Bearer ${getGraphCoolToken()}` : "",
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' &&
           operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppRoutes />
      </ApolloProvider>
    );
  }
}

export default App;
