import gql from "graphql-tag";

const GET_CONTACTS = gql`
  query PageContacts(
    $first: Int!
    $skip: Int!
    $searchFilter: ContactFilter
  ) {
    allContacts(
      filter: $searchFilter
      first: $first
      skip: $skip
      orderBy: updatedAt_DESC
    ) {
      id
      name
      email
      tel
      title
      reference
      description
      isReplied
      createdAt
      updatedAt
    }
  }
`

const GET_CONTACT_COUNT = gql`
  query ContactCount(
    $searchFilter: ContactFilter
  ) {
    _allContactsMeta(
      filter: $searchFilter
    ) {
      count
    }
  }
`

const CREATE_CONTACT = gql`
  mutation CreateContact(
    $name: String!
    $email: String!
    $tel: String!
    $title: String!
    $description: String!
    $reference: String!
    $isReplied: Boolean!
  ) {
    createContact(
      input: {
        name: $name
        email: $email
        tel: $tel
        title: $title
        description: $description
        reference: $reference
        isReplied: $isReplied
      }
    ) {
      id
      name
      email
      tel
      title
      reference
      description
      isReplied
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_CONTACT = gql`
  mutation UpdateContact(
    $id: ID!
    $name: String!
    $email: String!
    $tel: String!
    $title: String!
    $description: String!
    $reference: String!
    $isReplied: Boolean!
  ) {
    updateContact(
      input: {
        id: $id
        name: $name
        email: $email
        tel: $tel
        title: $title
        description: $description
        reference: $reference
        isReplied: $isReplied
      }
    ) {
      id
    }
  }
`;

const DELETE_A_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(
      input: {
        id: $id
      }
    ) {
      id
    }
  }
`;

export {
  GET_CONTACTS,
  GET_CONTACT_COUNT,
  CREATE_CONTACT,
  UPDATE_CONTACT,
  DELETE_A_CONTACT
}
