import React from 'react'
import { Mutation } from "react-apollo";
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame';
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'

const ContactMutationForm = props => (
  <React.Fragment>
    {props.contact && (
      <Mutation mutation={props.mutation}>
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <form onSubmit={e => {
              e.preventDefault();

              mutate({
                variables: {
                  ...props.contact,
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
              {error && (<div>{error.message}</div>)}
              {props.isCompleted && (
                <Success
                  message={props.message}
                  closeCompleted={props.closeCompleted}
                />
              )}
              <section className="modal-card-body u-txt-gray" style={{
                height: "400px",
                overflow: "auto",
              }}>
                <HorizontalInputBoxFrame
                  columnName="Name"
                >
                  <input
                    name="name"
                    className={`input ${error && props.checkError(error, 'name')}`}
                    type="text"
                    placeholder="Name"
                    value={props.contact.name}
                    onChange={props.handleChange}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame
                  columnName="Email"
                >
                  <input
                    name="email"
                    className={`input ${error && props.checkError(error, 'email')}`}
                    type="text"
                    placeholder="Email"
                    value={props.contact.email}
                    onChange={props.handleChange}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame
                  columnName="Tel"
                >
                  <input
                    name="tel"
                    className={`input ${error && props.checkError(error, 'tel')}`}
                    type="text"
                    placeholder="Tel"
                    value={props.contact.tel}
                    onChange={props.handleChange}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame
                  columnName="Title"
                >
                  <input
                    name="title"
                    className={`input ${error && props.checkError(error, 'title')}`}
                    type="text"
                    placeholder="Title"
                    value={props.contact.title}
                    onChange={props.handleChange}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame
                  columnName="Reference"
                >
                  <textarea
                    name="reference"
                    style={{ height: "100px"}}
                    className={`input ${error && props.checkError(error, 'reference')}`}
                    type="text"
                    placeholder="Reference"
                    value={props.contact.reference}
                    onChange={props.handleChange}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame
                  columnName="Description"
                >
                  <textarea
                    name="description"
                    style={{ height: "100px"}}
                    className={`input ${error && props.checkError(error, 'description')}`}
                    type="text"
                    placeholder="Description"
                    value={props.contact.description}
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

export default ContactMutationForm
