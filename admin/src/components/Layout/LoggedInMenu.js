import React from 'react'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import withActiveDropdown from '../../hocs/WithActiveDropdown';
import MyPaymentsModal from './MyPaymentsModal';
import MyProfileModal from './MyProfileModal';
import MyFavoritesModal from './MyFavoritesModal';
import MyBookingsModal from './MyBookingsModal';

const LoggedInMenu = props => (
  <React.Fragment>
    <div className="navbar-item">
      <span className="icon" style={{
        borderRadius: "50%",
        background: "rgb(0, 209, 178)",
        color: "#ffffff",
        height: "35px",
        width: "35px",
      }}>
        <i className="fas fa-user"></i>
      </span>
    </div>
    <div className="navbar-item">
      <div className={`dropdown ${props.isActive}`}>
        <div className="dropdown-trigger">
          <button
            className="button is-small"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            style={{ background: "rgb(0, 209, 178)", color: "#ffffff", border: 0 }}
            onClick={props.toggleIsActive}
          >
            <span>{props.me.email}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu u-no-br" id="dropdown-menu" role="menu">
          <div className="dropdown-content u-no-br">
            <MyProfileModal {...props} />
            <MyPaymentsModal {...props} />
            <MyFavoritesModal {...props} />
            <MyBookingsModal {...props} />
            <hr className="dropdown-divider" />
            <Link
              className="dropdown-item u-no-br"
              to="/logout"
            >
              LOGOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
)

export default compose(
  withActiveDropdown()
)(LoggedInMenu)