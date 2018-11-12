import React from 'react';
import { Link } from 'react-router-dom';
import { login, isLoggedIn } from '../utils/AuthService';

const Nav = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation" style={{
    background: "#007bff",
  }}>
    <div className="navbar-brand">
      <Link className="navbar-item" to="/" style={{
        color: "#ffffff",
      }}>
        BOOK ME INSTEAD. PLAYGROUND HOME
      </Link>
    </div>

    <div className="navbar-end">
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
              <button
                className="button is-danger"
                onClick={() => login()}
                style={{ borderRadius: 0 }}
              >
                LOGIN
              </button>
            )
          }
        </div>
      </div>
    </div>
  </nav>
)

export default Nav;