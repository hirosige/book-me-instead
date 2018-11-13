import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../utils/AuthService';

const Nav = (props) => (
  <nav className="navbar" role="navigation" aria-label="main navigation" style={{
    background: "#007bff",
  }}>
    <div className="navbar-brand">
      <Link className="navbar-item" to="/dashboard" style={{
        color: "#ffffff",
      }}>
        BOOK ME INSTEAD.ADMIN HOME
      </Link>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        {console.log(props.me)}
      </div>
      <div className="navbar-item">
        <div className="buttons">
          { (isLoggedIn()) ? (
              <Link
                className="button is-danger"
                to="/logout"
                style={{ borderRadius: 0 }}
              >
                LOGOUT
              </Link>
            ) : (
              <Link
                className="button is-danger"
                to="/login"
                style={{ borderRadius: 0 }}
              >
                LOGOUT
              </Link>
            )
          }
        </div>
      </div>
    </div>
  </nav>
)

export default Nav;