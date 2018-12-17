import gql from "graphql-tag";

const CREATE_TAG = gql`
  mutation CreateTag(
    $name: String!
    $color: String!
  ) {
    createTag(
      name: $name
      color: $color
    ) {
      id
    }
  }
`;

const ADD_TO_POST_TAGS = gql`
  mutation AddToPostTags(
    $tagsTagId: ID!
    $postsPostId: ID!
  ) {
    addToPostTags(
      tagsTagId: $tagsTagId
      postsPostId: $postsPostId
    ) {
      tagsTag {
        id
      }
      postsPost {
        id
      }
    }
  }
`;

export {
  CREATE_TAG,
  ADD_TO_POST_TAGS
}
