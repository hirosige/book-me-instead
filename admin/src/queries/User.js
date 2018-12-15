import gql from "graphql-tag";

const GET_USERS = gql`
  query PageUsers(
    $first: Int!
    $skip: Int!
    $searchFilter: UserFilter
  ) {
    allUsers(
      filter: $searchFilter
      first: $first
      skip: $skip
    ) {
      id
      auth0UserId
      email
      omiseCustomerId
      role
      profile {
        id
        firstName
        lastName
        tel
        address
        subscriptionEmail
        passportNo
      }
      favorites {
        id
        hotels {
          id
          name
        }
      }
    }
  }
`

const GET_USER_COUNT = gql`
  query UserCount(
    $searchFilter: UserFilter
  ) {
    _allUsersMeta(
      filter: $searchFilter
    ) {
      count
    }
  }
`

const CREATE_PROFILE = gql`
  mutation CreateProfile(
    $firstName: String!
    $lastName: String!
    $passportNo: String!
    $address: String!
    $tel: String!
    $subscriptionEmail: String!
    $userId: ID!
  ) {
    createProfile(
      firstName: $firstName
      lastName: $lastName
      passportNo: $passportNo
      address: $address
      tel: $tel
      subscriptionEmail: $subscriptionEmail
      userId: $userId
    ) {
      id
    }
  }
`

const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $passportNo: String!
    $address: String!
    $tel: String!
    $subscriptionEmail: String!
    $userId: ID!
  ) {
    updateProfile(
      id: $id
      firstName: $firstName
      lastName: $lastName
      passportNo: $passportNo
      address: $address
      tel: $tel
      subscriptionEmail: $subscriptionEmail
      userId: $userId
    ) {
      id
    }
  }
`

const CHANGE_ROLE = gql`
  mutation ChangeRole(
    $id: ID!
    $role: ROLE
  ) {
    updateUser(
      id: $id
      role: $role
    ) {
      id
    }
  }
`

export {
  GET_USERS,
  GET_USER_COUNT,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  CHANGE_ROLE
}