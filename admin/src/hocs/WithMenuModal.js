import React from 'react'

const withMenuModal = ({
  title,
}) => WrappedComponent => {
  return class HOC extends React.PureComponent {
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
            className="dropdown-item"
            style={{ cursor: "pointer" }}
            onClick={this.switchModal}
          >
            {title}
          </div>
          <div className={`modal ${this.state.isActive}`}>
            <div className="modal-background"></div>
            <div className="modal-content" style={{ width: "40%" }}>
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

export default withMenuModal