import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Callback from './components/Auth/Callback';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
import Logout from './components/Auth/Logout';
import Posts from './components/Posts';
import {
  getGraphCoolToken,
} from './utils/AuthService';
import Country from './components/Country/Country';
import CreateCountry from './components/Country/CreateCountry';
import Dashboard from './components/Dashboard';
import Login from './components/Auth/Login';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHCOOL_SIMPLE_ENDPOINT })

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

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Dashboard} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/callback' component={Callback} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/posts' component={Posts} />
            <Route exact path='/countries' component={Country} />
            <Route path='/countries/new' component={CreateCountry} />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
