import React from 'react'

const withMessageable = () => WrappedComponent => {
  return class HOC extends React.PureComponent {
    state = {
      isOpen: false,
      type: "is-primary",
      message: "",
    }

    closeNotification = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }

    notifyUser = ({ message, type }) => {
      this.setState({
        message,
        type,
        isOpen: true,
      })
    }

    render () {
      return (
        <React.Fragment>
          {this.state.isOpen && (
            <div
              class={`notification ${this.state.type} u-no-br`}
              style={{ marginBottom: 0, fontSize: "1rem" }}
            >
              <button class="delete" onClick={this.closeNotification}></button>
              {this.state.message}
            </div>
          )}
          <WrappedComponent
            notifyUser={this.notifyUser}
            {...this.props}
            {...this.state}
          />
        </React.Fragment>
      )
    }
  }
}

export default withMessageable
