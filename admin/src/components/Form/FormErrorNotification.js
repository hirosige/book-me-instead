import React from 'react'

class FormErrorNotification extends React.PureComponent {
  state = {
    isOpen: true
  }

  swithOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    const { graphqlErrors } = this.props

    return (
      <React.Fragment>
        {this.state.isOpen && (
          <article className="message is-danger u-no-br" style={{ padding: 0 }}>
            <div className="message-header u-no-br" style={{ padding: "7px 10px" }}>
              <p>Opps, Please check again below:</p>
              <div
                className="delete"
                aria-label="delete"
                onClick={this.swithOpen}
              >
              </div>
            </div>
            <div className="message-body" style={{ padding: "10px 20px" }}>
              {graphqlErrors.map((incident, i) => (
                <div key={`gqError-${i}`}>
                  <i className="fas fa-circle" style={{ marginRight: 10, fontSize: "0.7rem" }}></i>
                  <span style={{ fontSize: "0.9rem" }}>{incident.message}</span>
                </div>
              ))}
            </div>
          </article>
        )}
      </React.Fragment>
    )
  }
}

export default FormErrorNotification
