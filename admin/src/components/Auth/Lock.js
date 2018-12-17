import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';
import { isLoggedIn } from '../../utils/AuthService';
import OnlyTitleNav from '../OnlyTitleNav'

class Lock extends Component {
  lock = new Auth0Lock(
    process.env.REACT_APP_AUTH0_CLIENT_ID,
    process.env.REACT_APP_AUTH0_DOMAIN,
    {
    languageDictionary: {
      emailInputPlaceholder: 'something@youremail.com',
      title: 'BOOK ME INSTEAD.',
      primaryColor: '#17A2B8',
    },
    auth: {
      responseType: 'token id_token',
      redirectUrl: 'http://localhost:8080/callback',
      sso: false,
      params: {
        scope: 'openid email',
        audience: process.env.REACT_APP_AUTH0_API_IDENTIFIER,
      }
    },
    container: 'my-container',
    theme: {
      logo: 'https://s3-ap-southeast-1.amazonaws.com/suneikii.com/property.suneikii.png',
      primaryColor: '#17A2B8',
      authButtons: {
        testConnection: {
          displayName: 'Test Conn',
          primaryColor: '#17A2B8',
          foregroundColor: '#17A2B8',
          icon: 'http://example.com/icon.png',
        },
        testConnection2: {
          primaryColor: '#17A2B8',
          foregroundColor: '#ffffff',
        },
      },
    }
  });

  componentDidMount() {
    if (!isLoggedIn()) {
      this.lock.show();
    }
  }

  render() {
    const style = {
      display: "flex",
      alignItems: "center",
    }

    return(
      !isLoggedIn() ? (
        <div style={{
          background: "rgb(237, 242, 247)",
          height: "100vh",
          position: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%" }}
        >
          <OnlyTitleNav title="BOOK ME INSTEAD.ADMIN LOGIN" />
          <div id="my-container" style={style}></div>
        </div>
      ) : (
        <Redirect to={{
          pathname: '/dashboard',
          state: { from: this.props.location }
        }} />
      )
    );
  }
}

export default Lock;