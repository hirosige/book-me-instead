import React from 'react'
import { Link } from 'react-router-dom'

class Forbidden extends React.PureComponent {
  state = {
    isActive: false
  }

  switchActive = () => {
    this.setState({ isActive: !this.state.isActive })
  }

  render () {
    return (
      <nav class="navbar" role="navigation" aria-label="main navigation" style={{
        background: "#17a2b8",
        fontSize: "1rem",
      }}>
        <div class="navbar-brand">
          <div class="navbar-item" style={{
            color: "#ffffff"
          }}>
            Forbidden Area
          </div>

          <div
            role="button"
            class={`navbar-burger burger ${this.state.isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={this.switchActive}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div id="navbarBasicExample" class={`navbar-menu ${this.state.isActive ? "is-active" : ""}`}>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <Link className="button is-primary" to="/logout">SIGN OUT</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Forbidden
