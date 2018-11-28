import React from 'react'

const withActiveMenu = () => WrappedComponent => {
  return class HOC extends React.Component {
    state = {
      isActive: ""
    }

    activate = (path, item) => {
      if (path === item) return "is-active"
      return ""
    }

    render () {
      return (
        <React.Fragment>
          <WrappedComponent {...this.props} {...this.state} activate={this.activate} />
        </React.Fragment>
      )
    }
  }
}

export default withActiveMenu