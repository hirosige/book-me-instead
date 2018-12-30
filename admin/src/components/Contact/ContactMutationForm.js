import React from 'react'
import { Mutation } from "react-apollo";
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'
import HorizontalDoubleInputBody from '../Shared/HorizontalDoubleInputBody'
import HorizontalDoubleInputBox from '../Shared/HorizontalDoubleInputBox'

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
                height: "300px",
                overflow: "auto",
              }}>
                <HorizontalDoubleInputBody columnName="Name/Email">
                  <HorizontalDoubleInputBox>
                    <input
                      name="name"
                      className={`input ${error && props.checkError(error, 'name')}`}
                      type="text"
                      placeholder="Name"
                      value={props.contact.name}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                  <HorizontalDoubleInputBox>
                    <input
                      name="email"
                      className={`input ${error && props.checkError(error, 'email')}`}
                      type="text"
                      placeholder="Email"
                      value={props.contact.email}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                </HorizontalDoubleInputBody>

                <HorizontalDoubleInputBody columnName="Tel/Title">
                  <HorizontalDoubleInputBox>
                    <input
                      name="tel"
                      className={`input ${error && props.checkError(error, 'tel')}`}
                      type="text"
                      placeholder="Tel"
                      value={props.contact.tel}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                  <HorizontalDoubleInputBox>
                    <input
                      name="title"
                      className={`input ${error && props.checkError(error, 'title')}`}
                      type="text"
                      placeholder="Title"
                      value={props.contact.title}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                </HorizontalDoubleInputBody>

                <HorizontalDoubleInputBody columnName="Reference/Description">
                  <HorizontalDoubleInputBox>
                    <textarea
                      name="reference"
                      style={{ height: "100px"}}
                      className={`input ${error && props.checkError(error, 'reference')}`}
                      type="text"
                      placeholder="Reference"
                      value={props.contact.reference}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                  <HorizontalDoubleInputBox>
                    <textarea
                      name="description"
                      style={{ height: "100px"}}
                      className={`input ${error && props.checkError(error, 'description')}`}
                      type="text"
                      placeholder="Description"
                      value={props.contact.description}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                </HorizontalDoubleInputBody>
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
