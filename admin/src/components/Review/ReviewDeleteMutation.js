import React from 'react'
import { Mutation } from 'react-apollo';
import { produce } from 'immer';
import ButtonHasLoading from '../Shared/ButtonHasLoading'
import {
  DELETE_A_REVIEW,
  GET_REVIEWS,
} from '../../queries/Review';

const ReviewDeleteMutation = ({
  review,
  indexVariables,
  notifyUser,
}) => {
  return (
    <Mutation mutation={DELETE_A_REVIEW}>
      {mutation => (
        <ButtonHasLoading
          title="DELETE A REVIEW"
          message="Are you sure to delete ?, This is irreversible!"
          caption="DELETE"
          className="button is-danger u-no-br"
          onClick={ async () => {
            await mutation({
              variables: {
                id: review.id,
              },
              update: (store, { data }) => {
                if (!data || !data.deleteReview) {
                  return;
                }

                const reviews = store.readQuery({
                  query: GET_REVIEWS,
                  variables: indexVariables
                })

                store.writeQuery({
                  data: produce(reviews, ds => {
                    ds.allReviews.splice(
                      ds.allReviews.findIndex(review => review.id === data.deleteReview.id
                    ), 1)
                  }),
                  query: GET_REVIEWS,
                  variables: indexVariables,
                })
              },
            }).then(_ => {
              notifyUser({
                type: "is-success",
                message: "Review is successfully deleted"
              })
            }).catch(error => {
              notifyUser({
                type: "is-danger",
                message: error.message
              })
            })
          }}
        />
      )}
    </Mutation>
  )
}

export default ReviewDeleteMutation
