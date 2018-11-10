import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class NoContNav extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">SUNEIKII. PLAYGROUND HOME</Link>
        </div>
      </nav>
    );
  }
}

export default NoContNav;