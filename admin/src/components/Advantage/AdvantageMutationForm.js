import React from 'react'
import { Mutation } from "react-apollo";
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame';
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'

const AdvantageMutationForm = props => (
  <React.Fragment>
    {props.advantage && (
      <Mutation
        mutation={props.mutation}
      >
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <form onSubmit={e => {
              e.preventDefault();
              mutate({
                variables: props.advantage
              }).then(() => {
                props.notifyUser({ type: "is-success", message: "Advantage is successfully created" })
                props.initializeState()
                props.switchModal()
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
                    value={props.advantage.name}
                    onChange={props.handleChange}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame
                  columnName="Icon"
                  notice="Do not enter the first zero"
                >
                  <input
                    name="name"
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={props.advantage.name}
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

export default AdvantageMutationForm