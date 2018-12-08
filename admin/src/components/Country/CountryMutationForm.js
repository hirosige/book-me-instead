import React from 'react'
import { Mutation } from "react-apollo";
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame';
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'

const CountryMutationForm = props => (
  <React.Fragment>
    {props.country && (
      <Mutation
        mutation={props.mutation}
      >
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <form onSubmit={e => {
              e.preventDefault();
              mutate({
                variables: props.country
              }).then(() => {
                props.initializeState()
                props.makeCompleted()
              });

            }}>
              <header className="modal-card-head u-no-br u-bk-primary">
                <p className="modal-card-title u-txt-white">{props.title}</p>
                <div className="delete" aria-label="close" onClick={props.switchModal}></div>
              </header>
              {error && (
                <Danger message={error.message} />
              )}
              {props.isCompleted && (
                <Success
                  message={props.message}
                  closeCompleted={props.closeCompleted}
                />
              )}
              <section className="modal-card-body u-txt-gray">
                <HorizontalInputBoxFrame
                  columnName="Name"
                  notice="Do not enter the first zero"
                >
                  <input
                    name="name"
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={props.country.name}
                    onChange={props.handleChange}
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
                    value={props.country.code}
                    onChange={props.handleChange}
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
                    value={props.country.slug}
                    onChange={props.handleChange}
                  />
                </HorizontalInputBoxFrame>
              </section>
              <footer className="modal-card-foot u-no-br">
                <button className="button is-success u-no-br" type="submit">SUBMIT</button>
                <div className="button u-no-br" onClick={props.switchModal}>CANCEL</div>
              </footer>
            </form>
          </React.Fragment>
        )}
      </Mutation>
    )}
  </React.Fragment>
)

export default CountryMutationForm