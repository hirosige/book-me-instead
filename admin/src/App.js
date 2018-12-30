import React from 'react';
import { ApolloProvider } from 'react-apollo'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from 'apollo-boost'
import { setContext } from 'apollo-link-context';
import AppRoutes from './AppRoutes'

import {
  getGraphCoolToken,
} from './utils/AuthService';

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://4au0qh23r4.execute-api.ap-northeast-1.amazonaws.com/staging/'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getGraphCoolToken() ? `Bearer ${getGraphCoolToken()}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <AppRoutes />
  </ApolloProvider>
)

export default App;
