import React from 'react'
import { Mutation } from "react-apollo";
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame';
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'

const CountryMutationForm = props => (
  <React.Fragment>
    {props.country && (
      <Mutation mutation={props.mutation}>
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <form onSubmit={e => {
              e.preventDefault();

              mutate({
                variables: {
                  ...props.country,
                  locale: "en"
                }
              }).then(() => {
                props.initializeState()
                props.makeCompleted()
              })
            }}>
              <header className="modal-card-head u-no-br u-bk-primary">
                <p className="modal-card-title u-txt-white">{props.title}</p>
                <div className="delete" aria-label="close" onClick={props.switchModal}></div>
              </header>
              {error && error.graphQLErrors[0].functionError && (
                <Danger messages={error.graphQLErrors[0].functionError.errorMessages} />
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
                >
                  <input
                    name="name"
                    className={`input ${error && props.checkError(error, 'name')}`}
                    type="text"
                    placeholder="Name"
                    value={props.country.name}
                    onChange={props.handleChange}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame
                  columnName="Code"
                >
                  <input
                    name="code"
                    className={`input ${error && props.checkError(error, 'code')}`}
                    type="text"
                    placeholder="Code"
                    value={props.country.code}
                    onChange={props.handleChange}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame
                  columnName="Slug"
                >
                  <input
                    name="slug"
                    className={`input ${error && props.checkError(error, 'slug')}`}
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