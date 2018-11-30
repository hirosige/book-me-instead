import React from 'react'

const withStatelessToolHeader = title => WrappedComponent => {
  return class HOC extends React.Component {

    render () {
      return (
        <React.Fragment>
          <nav className="navbar" role="navigation" aria-label="main navigation" style={{ background: "#17a2b8", fontSize: "1.2rem", zIndex: 2 }}>
            <div className="navbar-brand">
              <div className="navbar-item" style={{ color: "#ffffff" }}>
                {title}
              </div>
            </div>
          </nav>
          <WrappedComponent {...this.props} {...this.state} />
        </React.Fragment>
      )
    }
  }
}

export default withStatelessToolHeader