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
      orderBy: updatedAt_DESC
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
      createdAt
      updatedAt
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
      input: {
        firstName: $firstName
        lastName: $lastName
        passportNo: $passportNo
        address: $address
        tel: $tel
        subscriptionEmail: $subscriptionEmail
        userId: $userId
      }
    ) {
      id
      firstName
      lastName
      tel
      address
      subscriptionEmail
      passportNo
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
  ) {
    updateProfile(
      input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        passportNo: $passportNo
        address: $address
        tel: $tel
        subscriptionEmail: $subscriptionEmail
      }
    ) {
      id
      firstName
      lastName
      tel
      address
      subscriptionEmail
      passportNo
    }
  }
`

const DELETE_A_USER = gql`
  mutation DeleteUser (
    $id: ID!
  ) {
    deleteUser(
      input: {
        id: $id
      }
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
      createdAt
      updatedAt
    }
  }
`

const CHANGE_ROLE = gql`
  mutation ChangeRole(
    $id: ID!
    $role: ROLE
  ) {
    updateUser(
      input: {
        id: $id
        role: $role
      }
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
      createdAt
      updatedAt
    }
  }
`

export {
  GET_USERS,
  GET_USER_COUNT,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  CHANGE_ROLE,
  DELETE_A_USER
}