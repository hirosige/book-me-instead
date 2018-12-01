import React from 'react'

const withModal = ({
  button,
  size,
  color,
  type
}) => WrappedComponent => {
  return class HOC extends React.Component {
    state = {
      isActive: "",
      isCompleted: false,
    }

    switchModal = () => {
      if (this.state.isActive === "is-active") {
        this.setState({
          isActive: "",
          isCompleted: false,
        })
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
            className={`button ${color} ${size} no-br`}
            onClick={this.switchModal}
          >{button}</button>
          <div className={`modal ${this.state.isActive}`}>
            <div className="modal-background"></div>
            <div className={`modal-${type}`}>
              <WrappedComponent
                {...this.props}
                {...this.state}
                makeCompleted={this.makeCompleted}
                closeCompleted={this.closeCompleted}
                switchModal={this.switchModal}
              />
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={this.switchModal}></button>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default withModal