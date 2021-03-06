import React from 'react'
import { compose } from 'recompose'
import withActiveMenu from '../hocs/WithActiveMenu';
// import hasLogger from '../hocs/HasLogger';
import { Link } from 'react-router-dom'

const SideMenu = (props) => (
  <React.Fragment>
    <nav className="navbar" role="navigation" aria-label="main navigation" style={{ background: "#17a2b8", fontSize: "1.2rem", zIndex: 2 }}>
      <div className="navbar-brand">
        <div className="navbar-item" style={{ color: "#ffffff" }}>
          MENU {props.isActive}
        </div>
      </div>
    </nav>
    <aside className="menu" style={{ padding: "10px", background: "#ffffff" }} >
      <p className="menu-label">
        GENERAL
      </p>
      <ul className="menu-list">
        <li><Link className={props.activate(props.componentName, 'Dashboard')} to="/dashboard">DASHBOARD</Link></li>
        <li><Link className={props.activate(props.componentName, 'Country')} to="/countries">COUNTRIES</Link></li>
        <li><Link className={props.activate(props.componentName, 'User')} to="/users">USERS</Link></li>
        <li><Link className={props.activate(props.componentName, 'Contact')} to="/contacts">CONTACTS</Link></li>
      </ul>
      <p className="menu-label">
        ACCOMMODATION
      </p>
      <ul className="menu-list">
        <li><Link className={props.activate(props.componentName, 'Hotel')} to="/hotels">HOTELS</Link></li>
        <li><Link className={props.activate(props.componentName, 'Advantage')} to="/advantages">ADVANTAGES</Link></li>
        <li><Link className={props.activate(props.componentName, 'Booking')} to="/bookings">BOOKINGS</Link></li>
        <li><Link className={props.activate(props.componentName, 'Review')} to="/reviews">REVIEWS</Link></li>
      </ul>
      <p className="menu-label">
        ACCOUNTING
      </p>
      <ul className="menu-list">
        <li><Link className={props.activate(props.componentName, 'Transaction')} to="/transactions">TRANSACTIONS</Link></li>
      </ul>
      <p className="menu-label">
        ARTICLES
      </p>
      <ul className="menu-list">
        <li><Link className={props.activate(props.componentName, 'Post')} to="/posts">POSTS</Link></li>
        <li><Link className={props.activate(props.componentName, 'PostCategories')} to="/post_categories">POST CATEGORIES</Link></li>
      </ul>
    </aside>
  </React.Fragment>
)

export default compose(
  withActiveMenu(),
  // hasLogger(true),
)(SideMenu)
