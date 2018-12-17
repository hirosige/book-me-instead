import React from 'react'
import { compose } from 'recompose'
import { Mutation, graphql } from "react-apollo";
import HorizontalDoubleInputBody from '../Shared/HorizontalDoubleInputBody'
import HorizontalDoubleInputBox from '../Shared/HorizontalDoubleInputBox'
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame'
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'
import { PAY_BY_DEFAULT_CARD } from '../../queries/OmiseCustomer'

const BookMutationForm = props => (
  <React.Fragment>
    {props.hotel && (
      <Mutation
        mutation={props.mutation}
      >
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <form onSubmit={e => {
              e.preventDefault();

              mutate({
                variables: {
                  ...props.booking,
                }
              }).then(result => {
                props.payByDefaultCard({
                  variables: {
                    ...props.charge,
                  }
                }).then(result => {
                  props.initializeState()
                  props.makeCompleted()
                })
              });

            }}>
              <header className="modal-card-head u-no-br u-bk-primary">
                <p className="modal-card-title u-txt-white">{props.title}</p>
                <div className="delete" aria-label="close" onClick={props.switchModal}></div>
              </header>
              {error && (
                <div>{error.message}</div>
              )}
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
                <HorizontalDoubleInputBody columnName="CheckIn/CheckOut">
                  <HorizontalDoubleInputBox>
                    <input
                      name="name"
                      className="input"
                      type="text"
                      placeholder="Name"
                      value={props.booking.checkIn}
                      onChange={props.handleBookingChange}
                    />
                  </HorizontalDoubleInputBox>
                  <HorizontalDoubleInputBox>
                    <input
                      name="email"
                      className="input"
                      type="text"
                      placeholder="Email"
                      value={props.booking.checkOut}
                      onChange={props.handleBookingChange}
                    />
                  </HorizontalDoubleInputBox>
                </HorizontalDoubleInputBody>

                <div style={{ height: "10px" }} />
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

export default compose(
  graphql(PAY_BY_DEFAULT_CARD, { name: "payByDefaultCard" }),
)(BookMutationForm)