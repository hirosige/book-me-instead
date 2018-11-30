import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './Country.css'

class CreateCountry extends Component {
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
        country: { name: "", code: "", slug: "" }
      })
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>
          { this.state.isComplete && (
            <div className="notification is-success">
              <button className="delete" onClick={this.handleClose}></button>
              Country is successfuly created
            </div>
          )}

          <form onSubmit={this.handleSubmit}>
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
            <div className="field is-grouped">
              <div className="control">
                { this.state.isSending ? (
                  <button type="submit" className="button is-warning is-small" disabled>送信中..</button>
                ) : (
                  <button type="submit" className="button is-link is-small">Submit</button>
                )}
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
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
})(CreateCountry)

export default PageWithQuery