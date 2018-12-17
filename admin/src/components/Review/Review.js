import React from 'react'
import DeleteMutation from '../Shared/DeleteMutation';
import ReviewEditMutation from './ReviewEditMutation';
import { DELETE_A_REVIEW } from '../../queries/Review'
import Rating from 'react-rating'

const Review = ({ review, me }) => (
  <tr>
    <td>
      <Rating
        initialRating={review.rating}
        emptySymbol="far fa-star"
        fullSymbol="fas fa-star"
        style={{ color: "#FF2B56" }}
        readonly
      />
    </td>
    <td>{review.description}</td>
    <td>
      {review.user && (
        <span className="tag is-primary">
          {review.user.id}
        </span>
      )}
    </td>
    <td>
      {review.hotel && (
        <span className="tag is-success">
          {review.hotel.id}
        </span>
      )}
    </td>
    <td>
      <div className="field has-addons">
        <div className="control">
          <ReviewEditMutation
            editItem={review}
          />
        </div>
        <div className="control">
          <DeleteMutation
            deleteId={review.id}
            title="Are you sure to delete ?"
            mutation={DELETE_A_REVIEW}
          />
        </div>
      </div>
    </td>
  </tr>
)

export default Review
