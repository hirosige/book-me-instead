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

const PAY_BY_DEFAULT_CARD = gql`
  mutation PayByDefaultCard(
    $amount: Int!
    $currency: String!
    $customerId: String!
    $description: String!
  ) {
    payByDefaultCard(
      amount: $amount
      currency: $currency
      customerId: $customerId
      description: $description
    ) {
      id
    }
  }
`

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    getTransactions {
      id
      object
      amount
      created
      currency
      source
      transferable
      location
      type
    }
  }
`

export {
  GET_CUSTOMER,
  ADD_CARD_TO_CUSTOMER,
  PAY_BY_DEFAULT_CARD,
  GET_TRANSACTIONS
}