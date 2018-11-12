import React, { Component } from 'react';
import '../App.css';

class OnlyTitleNav extends Component {

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation" style={{
        background: "#17a2b8",
        position: "fixed",
        width: "100%",
        top: 0
      }}>
        <div className="navbar-brand">
          <div className="navbar-item" style={{
            color: "#ffffff",
          }}>
            {this.props.title}
          </div>
        </div>
      </nav>
    );
  }
}

export default OnlyTitleNav;