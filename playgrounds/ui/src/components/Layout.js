import React from 'react';
import Nav from './Nav';

import MenuNav from './MenuNav';
import SideMenu from './SideMenu';

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
          <SideMenu />
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