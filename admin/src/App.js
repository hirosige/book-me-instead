import React from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from 'apollo-boost'
// import {  } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
// import {  } from 'apollo-cache-inmemory'
// import {  } from 'apollo-link';
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

const App = () => (
  <ApolloProvider client={client}>
    <AppRoutes />
  </ApolloProvider>
)

export default App;
