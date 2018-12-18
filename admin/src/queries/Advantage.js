import gql from "graphql-tag";

const GET_ADVANTAGES = gql`
  query PageAdvantages(
    $first: Int!
    $skip: Int!
    $searchFilter: AdvantageFilter
  ) {
    allAdvantages(
      filter: $searchFilter
      first: $first
      skip: $skip
      orderBy: updatedAt_DESC
    ) {
      id
      name
      icon {
        name
        cdnUrl
        isImage
        isStored
        mimeType
        uuid
        size
      }
      hotels {
        name
      }
      createdAt
      updatedAt
    }
  }
`

const GET_ADVANTAGE_COUNT = gql`
  query AdvantageCount(
    $searchFilter: AdvantageFilter
  ) {
    _allAdvantagesMeta(
      filter: $searchFilter
    ) {
      count
    }
  }
`

const CREATE_ADVANTAGE = gql`
  mutation CreateAdvantage(
    $name: String!
    $iconName: String!
    $iconCdnUrl: String!
    $iconIsImage: Boolean!
    $iconIsStored: Boolean!
    $iconMimeType: String!
    $iconUuid: String!
    $iconSize: Int!
  ) {
    createAdvantage(
      name: $name
      icon: {
        name: $iconName
        cdnUrl: $iconCdnUrl
        isImage: $iconIsImage
        isStored: $iconIsStored
        mimeType: $iconMimeType
        uuid: $iconUuid
        size: $iconSize
      }
    ) {
      id
    }
  }
`;

const UPDATE_ADVANTAGE = gql`
  mutation UpdateAdvantage(
    $id: ID!
    $name: String!
    $iconName: String!
    $iconCdnUrl: String!
    $iconIsImage: Boolean!
    $iconIsStored: Boolean!
    $iconMimeType: String!
    $iconUuid: String!
    $iconSize: Int!
  ) {
    updateAdvantage(
      id: $id
      name: $name
      icon: {
        name: $iconName
        cdnUrl: $iconCdnUrl
        isImage: $iconIsImage
        isStored: $iconIsStored
        mimeType: $iconMimeType
        uuid: $iconUuid
        size: $iconSize
      }
    ) {
      id
    }
  }
`;


const DELETE_AN_ADVANTAGE = gql`
  mutation DeleteAdvantage($id: ID!) {
    deleteAdvantage(id: $id) {
      id
    }
  }
`;

export {
  GET_ADVANTAGES,
  GET_ADVANTAGE_COUNT,
  CREATE_ADVANTAGE,
  UPDATE_ADVANTAGE,
  DELETE_AN_ADVANTAGE,
}