import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './Country.css'

class CreateCountryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: {
        name: "",
        code: "",
        slug: ""
      },
      isActive: "",
      isSending: false,
      isComplete: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = event => {
    this.setState({ isComplete: false })
  }

  handleChange(event) {
    this.setState({
      country: {
        ...this.state.country,
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({
      isSending: true,
    })

    const {
      name,
      code,
      slug
    } = this.state.country

    try {
      await this.props.createCountry({
        variables: {
          name,
          code,
          slug
        }
      });
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.setState({
        isSending: false,
        isComplete: true,
        country: { name: "", code: "", slug: "" },
        isActive: ""
      })
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div style={{ padding: "10px" }}>
        <div className={`modal ${this.props.isActive}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <form onSubmit={this.handleSubmit}>
              <header className="modal-card-head" style={{ background: "rgb(0, 123, 255)", borderRadius: 0 }}>
                <p className="modal-card-title" style={{ color: "#ffffff", fontSize: "1.3rem" }}>Create New Country</p>
                <div className="delete" aria-label="close" onClick={this.props.switchModal.bind(this)}></div>
              </header>
              <section className="modal-card-body">
                { this.state.isComplete && (
                  <div className="notification is-success" style={{ borderRadius: 0 }}>
                    <div className="delete" onClick={this.handleClose}></div>
                    <nav className="level">
                      <div className="level-left">
                        <div className="level-item">
                          Country is successfuly created
                        </div>
                      </div>

                      <div className="level-right">
                        <div className="level-item">
                          <div className="button is-primary is-small" style={{ borderRadius: 0 }}>
                            Back to Country List
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>
                )}
                <div className="field is-horizontal is-grouped">
                  <div className="field-label is-normal">
                    <label className="label">Name</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="Input Name"
                          name="name"
                          value={this.state.country.name}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Code</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="Input Code"
                          name="code"
                          value={this.state.country.code}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Slug</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="Input Slug"
                          name="slug"
                          value={this.state.country.slug}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot" style={{ borderRadius: 0 }}>
                { this.state.isSending ? (
                  <button type="submit" className="button is-warning is-small is-loading" disabled>Submit</button>
                ) : (
                  <button type="submit" className="button is-link is-small">Submit</button>
                )}
                <div className="button is-small" onClick={this.props.switchModal.bind(this)}>Cancel</div>
              </footer>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const CREATE_COUNTRY = gql`
  mutation CreateCountry(
    $name: String!,
    $code: String!,
    $slug: String!
  ) {
    createCountry(
      name: $name,
      code: $code,
      slug: $slug
    ) {
      id
    }
  }
`

const PageWithQuery = graphql(CREATE_COUNTRY, {
  name: 'createCountry'
})(CreateCountryModal)

export default PageWithQuery