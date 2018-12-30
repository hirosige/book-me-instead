import gql from "graphql-tag";

const CREATE_ADVANTAGE_ICON = gql`
  mutation CreateAdvantageIcon(
    $cdnUrl: String!
    $isImage: Boolean!
    $isStored: Boolean!
    $mimeType: String!
    $size: Int!
    $name: String!
    $uuid: String!
  ) {
    createAdvantageIcon(
      input: {
        cdnUrl: "teat"
        isImage: true
        isStored: true
        mimeType: "test"
        size: 100
        name: "test"
        uuid: "test"
      }
    ) {
      id
      name
    }
  }
`;

const UPDATE_ADVANTAGE = gql`
  mutation UpdateAdvantage(
    $id: ID!
    $name: String!
    $code: String!
    $slug: String!
  ) {
    updateAdvantage(
      input: {
        id: $id
        name: $name
      }
    ) {
      id
      name
      icon {
        name
      }
      hotels {
        name
      }
    }
  }
`;

const DELETE_AN_ADVANTAGE = gql`
  mutation DeleteAdvantage($id: ID!) {
    deleteAdvantage(
      input: {
        id: $id
      }
    ) {
      id
    }
  }
`;

export {
  CREATE_ADVANTAGE_ICON,
  UPDATE_ADVANTAGE,
  DELETE_AN_ADVANTAGE,
}
