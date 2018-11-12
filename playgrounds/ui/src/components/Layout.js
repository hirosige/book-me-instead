import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import MenuNav from './MenuNav';

const Layout = (props) => (
  <div>
    <Nav />
    <div className="columns is-gapless is-multiline is-mobile">
      <div className="column is-one-quarter">
        <MenuNav title="MENU" />
        <div style={{
          background: "#ffffff",
          minHeight: "100vh",
        }}>
          <aside className="menu" style={{ padding: "10px" }} >
            <p className="menu-label">
              GENERAL
            </p>
            <ul className="menu-list">
              <li><Link to="/">HOME</Link></li>
              <li>
                <Link to="/posts">POSTS</Link>
              </li>
              <li>
                <Link className="is-active" to="/countries">COUNTRIES</Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
      <div className="column">
        <MenuNav title="CONTENTS" />
        <div style={{
          background: "rgb(237, 242, 247)",
          minHeight: "100vh",
        }}>
          { props.children }
        </div>
      </div>
    </div>
  </div>
)

export default Layout;