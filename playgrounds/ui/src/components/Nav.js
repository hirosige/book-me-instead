import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { login, isLoggedIn, isAccountExpired, logout } from '../utils/AuthService';
import '../App.css';

class Nav extends Component {
  async componentDidlMount() {
    if (isLoggedIn()) {
      if (isAccountExpired()) {
        logout()
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.props.history.replace('/')
      }
    }
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">SUNEIKII. PLAYGROUND HOME</Link>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item">
           {
             (isLoggedIn()) ? ( <Link className="btn btn-danger log" to="/logout">Logout</Link> ) : ( <button className="btn btn-danger log" onClick={() => login()}>Log In</button> )
           }
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);