import React from 'react'

const withModal = (buttonCaption, buttonSize) => WrappedComponent => {
  return class HOC extends React.Component {
    state = {
      isActive: "",
      isCompleted: false,
    }

    switchModal = () => {
      if (this.state.isActive === "is-active") {
        this.setState({ isActive: "" })
      } else {
        this.setState({ isActive: "is-active" })
      }
    }

    closeCompleted = () => {
      this.setState({
        isCompleted: false,
      })
    }

    makeCompleted = () => {
      this.setState({
        isCompleted: true,
      })
    }

    render () {
      return (
        <React.Fragment>
          <button
            className={`button is-primary ${buttonSize} no-br`}
            onClick={this.switchModal}
          >{buttonCaption}</button>
          <div className={`modal ${this.state.isActive}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <WrappedComponent
                {...this.props}
                {...this.state}
                makeCompleted={this.makeCompleted}
                closeCompleted={this.closeCompleted}
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