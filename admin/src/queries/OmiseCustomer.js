import gql from "graphql-tag";

const GET_CUSTOMER = gql`
  query GetCustomer(
    $customerId: String!
  ) {
    getCustomer(
      customerId: $customerId
    ) {
      id
      description
      email
      metadata
      livemode
      location
      cards
      created
      defaultCard
      deleted
    }
  }
`

const ADD_CARD_TO_CUSTOMER = gql`
  mutation AddCardToCustomer(
    $customerId: String!
    $cardToken: String!
  ) {
    addCardToCustomer(
      customerId: $customerId
      cardToken: $cardToken
    ) {
      id
    }
  }
`

export {
  GET_CUSTOMER,
  ADD_CARD_TO_CUSTOMER
}