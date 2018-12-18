import gql from "graphql-tag";

const GET_POST_CATEGORIES = gql`
  query PagePosts(
    $first: Int!
    $skip: Int!
    $searchFilter: PostCategoryFilter
  ) {
    allPostCategories(
      filter: $searchFilter
      first: $first
      skip: $skip
    ) {
      id
      name
      children {
        id
        name
        children {
          id
          name
          isRoot
        }
      }
    }
  }
`

const GET_POST_CATEGORY_COUNT = gql`
  query PostCount(
    $searchFilter: PostCategoryFilter
  ) {
    _allPostCategoriesMeta(
      filter: $searchFilter
    ) {
      count
    }
  }
`

const CREATE_POST_CATEGORY = gql`
  mutation CreatePostCategory(
    $name: String!
    $isRoot: Boolean!
  ) {
    createPostCategory(
      name: $name
      isRoot: $isRoot
    ) {
      id
    }
  }
`;

const ADD_TO_CHILDREN = gql`
  mutation AddToChildren(
    $children1PostCategoryId: ID!
    $children2PostCategoryId: ID!
  ) {
    addToChildren(
      children1PostCategoryId: $children1PostCategoryId
      children2PostCategoryId: $children2PostCategoryId
      orderBy: updatedAt_DESC
    ) {
      children2PostCategory {
        id
      }
      children1PostCategory {
        id
      }
      createdAt
      updatedAt
    }
  }
`;

const DELETE_A_POST_CATEGORY = gql`
  mutation DeletePostCategory($id: ID!) {
    deletePostCategory(id: $id) {
      id
    }
  }
`;

export {
  GET_POST_CATEGORIES,
  GET_POST_CATEGORY_COUNT,
  ADD_TO_CHILDREN,
  CREATE_POST_CATEGORY,
  DELETE_A_POST_CATEGORY
}