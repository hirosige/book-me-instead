import gql from "graphql-tag";

const GET_REVIEWS = gql`
  query PageReviews(
    $first: Int!
    $skip: Int!
    $searchFilter: ReviewFilter
  ) {
    allReviews(
      filter: $searchFilter
      first: $first
      skip: $skip
      orderBy: updatedAt_DESC
    ) {
      id
      rating
      description
      user {
        id
        email
      }
      hotel {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

const GET_REVIEW_COUNT = gql`
  query ReviewCount(
    $searchFilter: ReviewFilter
  ) {
    _allReviewsMeta(
      filter: $searchFilter
    ) {
      count
    }
  }
`

const CREATE_REVIEW = gql`
  mutation CreateReview(
    $rating: Float!
    $description: String!
    $userId: ID!
    $hotelId: ID!
  ) {
    createReview(
      rating: $rating
      description: $description
      userId: $userId
      hotelId: $hotelId
    ) {
      id
    }
  }
`;

const UPDATE_REVIEW = gql`
  mutation UpdateReview(
    $id: ID!
    $rating: Float!
    $description: String!
    $userId: ID!
    $hotelId: ID!
  ) {
    updateReview(
      id: $id
      rating: $rating
      description: $description
      userId: $userId
      hotelId: $hotelId
    ) {
      id
    }
  }
`;


const DELETE_A_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id) {
      id
    }
  }
`;

export {
  GET_REVIEWS,
  GET_REVIEW_COUNT,
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DELETE_A_REVIEW,
}