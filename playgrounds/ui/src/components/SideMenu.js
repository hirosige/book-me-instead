import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

class SideMenu extends Component {

  activate (path, item) {
    if (path === item) return "is-active"
    return ""
  }

  render () {
    const { location } = this.props
    console.log(location.pathname)

    return (
      <aside className="menu" style={{ padding: "10px" }} >
        <p className="menu-label">
          GENERAL
        </p>
        <ul className="menu-list">
          <li><Link className={this.activate(location.pathname, '/dashboard')} to="/dashboard">DASHBOARD</Link></li>
          <li><Link className={this.activate(location.pathname, '/posts')}     to="/posts">POSTS</Link></li>
          <li><Link className={this.activate(location.pathname, '/countries')} to="/countries">COUNTRIES</Link></li>
        </ul>
      </aside>
    )
  }
}

export default withRouter(SideMenu)