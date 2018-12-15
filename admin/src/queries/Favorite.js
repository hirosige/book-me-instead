import gql from "graphql-tag";

const CREATE_FAVORITE = gql`
  mutation CreateFavorite(
    $hotelsId: ID!
    $userId: ID!
  ) {
    createFavorite(
      userId: $userId
      hotelsId: $hotelsId
    ) {
      id
    }
  }
`;

export {
  CREATE_FAVORITE
}
