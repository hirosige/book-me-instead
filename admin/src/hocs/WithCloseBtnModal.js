import React from 'react'

const withCloseBtnModal = ({
  button,
  size,
  color,
  type,
  style
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
          <div
            className={`delete is-small`}
            onClick={this.switchModal}
          />
          <div className={`modal ${this.state.isActive}`}>
            <div className="modal-background"></div>
            <div className={`modal-${type}`} style={style}>
              <WrappedComponent
                {...this.props}
                {...this.state}
                makeCompleted={this.makeCompleted}
                closeCompleted={this.closeCompleted}
                switchModal={this.switchModal}
              />
            </div>
            <div
              className="modal-close is-large"
              aria-label="close"
              onClick={this.switchModal}>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default withCloseBtnModal