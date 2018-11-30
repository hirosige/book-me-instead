import React from 'react'
import { Mutation } from "react-apollo";
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame';
import { CREATE_COUNTRY } from '../../queries/Country'
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'

class CountryCreateMutation extends React.Component {
  state = {
    name: "",
    code: "",
    slug: "",
  }

  initializeState = () => {
    this.setState({
      name: "",
      code: "",
      slug: "",
    })
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  render () {
    return (
      <React.Fragment>
        <Mutation
          mutation={CREATE_COUNTRY}
        >
          {(createCountry, { data, loading, error }) => (
            <React.Fragment>
              <form onSubmit={e => {
                e.preventDefault();
                createCountry({ variables: {
                  name: this.state.name,
                  code: this.state.code,
                  slug: this.state.slug,
                }}).then(() => {
                  this.initializeState()
                  this.props.makeCompleted()
                });

                }}
              >
                <header className="modal-card-head no-br bk-primary">
                  <p className="modal-card-title txt-white">CREATE COUNTRY</p>
                  <div className="delete" aria-label="close" onClick={this.props.switchModal}></div>
                </header>
                {error && (
                  <Danger message={error.message} />
                )}
                {this.props.isCompleted && (
                  <Success
                    message="Country is Successfully created."
                    closeCompleted={this.props.closeCompleted}
                  />
                )}
                <section className="modal-card-body txt-gray">
                  <HorizontalInputBoxFrame
                    columnName="Name"
                    notice="Do not enter the first zero"
                  >
                    <input
                      name="name"
                      className="input"
                      type="text"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                  <HorizontalInputBoxFrame
                    columnName="Code"
                    notice="Do not enter the first zero"
                  >
                    <input
                      name="code"
                      className="input"
                      type="text"
                      placeholder="Code"
                      value={this.state.code}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                  <HorizontalInputBoxFrame
                    columnName="Slug"
                    notice="Do not enter the first zero"
                  >
                    <input
                      name="slug"
                      className="input"
                      type="text"
                      placeholder="Slug"
                      value={this.state.slug}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                </section>
                <footer className="modal-card-foot no-br">
                  <button className="button is-success no-br" type="submit no-br">SUBMIT</button>
                  <div className="button no-br" onClick={this.props.switchModal}>CANCEL</div>
                </footer>
              </form>
            </React.Fragment>
          )}
        </Mutation>
      </React.Fragment>
    )
  }
}

export default compose(
  withModal('CREATE COUNTRY')
)(CountryCreateMutation)