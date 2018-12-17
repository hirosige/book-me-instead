import React from 'react'
import { Mutation } from "react-apollo";
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame';
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'
import Rating from 'react-rating'

const ReviewMutationForm = props => (
  <React.Fragment>
    {props.review && (
      <Mutation mutation={props.mutation}>
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <form onSubmit={e => {
              e.preventDefault();

              mutate({
                variables: {
                  ...props.review,
                  rating: parseFloat(props.review.rating)
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
              <section className="modal-card-body u-txt-gray">
                <HorizontalInputBoxFrame
                  columnName="Rating"
                >
                  <Rating
                    name="rating"
                    initialRating={props.review.rating}
                    fractions={10}
                    emptySymbol="far fa-star"
                    fullSymbol="fas fa-star"
                    style={{ color: "#FF2B56", fontSize: "2rem" }}
                    onChange={props.handleChangeStar}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame
                  columnName="Description"
                >
                  <textarea
                    name="description"
                    style={{ height: "100px" }}
                    className={`input ${error && props.checkError(error, 'description')}`}
                    type="number"
                    step="any"
                    placeholder="Description"
                    value={props.review.description}
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

export default ReviewMutationForm
