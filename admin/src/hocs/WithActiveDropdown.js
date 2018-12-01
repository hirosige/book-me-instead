import React from 'react'

const withActiveDropdown = () => WrappedComponent => {
  return class HOC extends React.Component {
    state = {
      isActive: ""
    }

    toggleIsActive = () => {
      if (this.state.isActive) {
        this.setState({ isActive: "" })
      } else {
        this.setState({ isActive: "is-active" })
      }
    }

    render () {
      return (
        <React.Fragment>
          <WrappedComponent
            {...this.props}
            {...this.state}
            toggleIsActive={this.toggleIsActive} />
        </React.Fragment>
      )
    }
  }
}

export default withActiveDropdown