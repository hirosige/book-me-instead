import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

const Layout = (props) => (
  <div>
    <Nav />
    <div className="row" style={{ padding: 0 }}>
      <div className="col" style={{ padding: 0 }}>
        <div className="list-group" style={{ borderRadius: 0 }}>
          <Link
            className="list-group-item list-group-item-action"
            to="/posts"
            style={{ borderRadius: 0 }}
          >POSTS</Link>
        </div>
      </div>
      <div className="col-9" style={{ padding: 0 }}>
        { props.children }
      </div>
    </div>
  </div>
)

export default Layout;