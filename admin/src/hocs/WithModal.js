import React from 'react'

const withModal = buttonCaption => WrappedComponent => {
  return class HOC extends React.Component {
    state = {
      isActive: "",
    }

    switchModal = () => {
      if (this.state.isActive === "is-active") {
        this.setState({ isActive: "" })
      } else {
        this.setState({ isActive: "is-active" })
      }
    }

    render () {
      return (
        <React.Fragment>
          <button
            className="button is-primary"
            style={{ borderRadius: 0 }}
            onClick={this.switchModal}
          >{buttonCaption}</button>
          <div className={`modal ${this.state.isActive}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <WrappedComponent
                {...this.props}
                {...this.state}
                switchModal={this.switchModal}
              />
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default withModal