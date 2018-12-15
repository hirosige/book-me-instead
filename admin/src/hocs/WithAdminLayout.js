import React from 'react'
import { compose } from 'recompose'
import SideMenu from '../components/SideMenu'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../utils/AuthService'
import LoggedInMenu from '../components/Layout/LoggedInMenu'

const withAdminLayout = () => WrappedComponent => {

  return class HOC extends React.Component {
    render () {
      return (
        <React.Fragment>
          <nav className="navbar" role="navigation" aria-label="main navigation" style={{ background: "#007bff", fontSize: "1.2rem" }}>
            <div className="navbar-brand">
              <div className="navbar-item" style={{ color: "#ffffff" }}>
                BOOK ME INSTEAD.ADMIN HOME
              </div>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                {(isLoggedIn()) ? (
                  <LoggedInMenu {...this.props} />
                ) : (
                  <div className="navbar-item">
                    <Link
                      className="button is-danger u-no-br"
                      to="/login"
                    >
                      LOGOUT
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <div className="columns is-gapless is-multiline is-mobile" style={{ margin: 0 }}>
            <div className="column is-2 u-txt-white">
              <SideMenu {...this.props} />
            </div>
            <div className="column" style={{ background: "rgb(237, 242, 247)" }}>
              <WrappedComponent {...this.props} />
            </div>
          </div>
          <footer className="footer l-footer p-footer">
            <div className="content has-text-left">
              <p>
                <strong>BOOK ME INSTEAD</strong> by SUNEIKII.
              </p>
            </div>
          </footer>
        </React.Fragment>
      )
    }
  }
}

export default compose(
)(withAdminLayout)
