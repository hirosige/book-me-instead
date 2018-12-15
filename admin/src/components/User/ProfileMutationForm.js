import React from 'react'
import { Mutation } from "react-apollo";
import HorizontalDoubleInputBody from '../Shared/HorizontalDoubleInputBody'
import HorizontalDoubleInputBox from '../Shared/HorizontalDoubleInputBox'
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'

const ProfileMutationForm = props => (
  <React.Fragment>
    {props.profile && (
      <Mutation
        mutation={props.mutation}
      >
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <form onSubmit={e => {
              e.preventDefault();
              mutate({
                variables: props.profile
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
                <HorizontalDoubleInputBody columnName="Fisrt Name/Last Name">
                  <HorizontalDoubleInputBox>
                    <input
                      name="firstName"
                      className="input"
                      type="text"
                      placeholder="First Name"
                      value={props.profile.firstName}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                  <HorizontalDoubleInputBox>
                    <input
                      name="lastName"
                      className="input"
                      type="text"
                      placeholder="Last Name"
                      value={props.profile.lastName}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                </HorizontalDoubleInputBody>
                <HorizontalDoubleInputBody columnName="Passport No/Tel">
                  <HorizontalDoubleInputBox>
                    <input
                      name="passportNo"
                      className="input"
                      type="text"
                      placeholder="Passport No"
                      value={props.profile.passportNo}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                  <HorizontalDoubleInputBox>
                    <input
                      name="tel"
                      className="input"
                      type="text"
                      placeholder="Tel"
                      value={props.profile.tel}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                </HorizontalDoubleInputBody>
                <HorizontalDoubleInputBody columnName="Address/Subscription Email">
                  <HorizontalDoubleInputBox>
                    <textarea
                      name="address"
                      className="input u-h150"
                      type="text"
                      placeholder="Address"
                      value={props.profile.address}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                  <HorizontalDoubleInputBox>
                    <input
                      name="subscriptionEmail"
                      className="input"
                      type="text"
                      placeholder="Subscription Email"
                      value={props.profile.subscriptionEmail}
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

export default ProfileMutationForm