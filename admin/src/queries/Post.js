import gql from "graphql-tag";

const GET_POSTS = gql`
  query PagePosts(
    $first: Int!
    $skip: Int!
    $searchFilter: PostFilter
  ) {
    allPosts(
      filter: $searchFilter
      first: $first
      skip: $skip
    ) {
      id
      title
      mdContents
      hero {
        id
        cdnUrl
      }
      photos {
        id
        cdnUrl
        count
      }
      author {
        id
      }
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`

const GET_POST_COUNT = gql`
  query PostCount(
    $searchFilter: PostFilter
  ) {
    _allPostsMeta(
      filter: $searchFilter
    ) {
      count
    }
  }
`

const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $mdContents: String!
    $authorId: ID!
    $categoryId: ID!
    $heroName: String
    $heroCdnUrl: String
    $heroIsImage: Boolean
    $heroIsStored: Boolean
    $heroMimeType: String
    $heroUuid: String
    $heroSize: Int
    $photoGrpName: String
    $photoGrpCdnUrl: String
    $photoGrpIsImage: Boolean
    $photoGrpIsStored: Boolean
    $photoGrpCount: Int
    $photoGrpUuid: String
    $photoGrpSize: Int
  ) {
    createPost(
      title: $title
      mdContents: $mdContents
      categoryId: $categoryId
      hero: {
        name: $heroName
        cdnUrl: $heroCdnUrl
        isImage: $heroIsImage
        isStored: $heroIsStored
        mimeType: $heroMimeType
        uuid: $heroUuid
        size: $heroSize
      }
      photos: {
        name: $photoGrpName
        cdnUrl: $photoGrpCdnUrl
        isImage: $photoGrpIsImage
        isStored: $photoGrpIsStored
        count: $photoGrpCount
        uuid: $photoGrpUuid
        size: $photoGrpSize
      }
      authorId: $authorId
    ) {
      id
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: ID!
    $title: String!
    $mdContents: String!
    $authorId: ID!
    $categoryId: ID!
    $heroName: String
    $heroCdnUrl: String
    $heroIsImage: Boolean
    $heroIsStored: Boolean
    $heroMimeType: String
    $heroUuid: String
    $heroSize: Int
    $photoGrpName: String
    $photoGrpCdnUrl: String
    $photoGrpIsImage: Boolean
    $photoGrpIsStored: Boolean
    $photoGrpCount: Int
    $photoGrpUuid: String
    $photoGrpSize: Int
  ) {
    updatePost(
      id: $id
      title: $title
      mdContents: $mdContents
      categoryId: $categoryId
      hero: {
        name: $heroName
        cdnUrl: $heroCdnUrl
        isImage: $heroIsImage
        isStored: $heroIsStored
        mimeType: $heroMimeType
        uuid: $heroUuid
        size: $heroSize
      }
      photos: {
        name: $photoGrpName
        cdnUrl: $photoGrpCdnUrl
        isImage: $photoGrpIsImage
        isStored: $photoGrpIsStored
        count: $photoGrpCount
        uuid: $photoGrpUuid
        size: $photoGrpSize
      }
      authorId: $authorId
    ) {
      id
    }
  }
`;

const DELETE_A_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export {
  GET_POSTS,
  GET_POST_COUNT,
  CREATE_POST,
  UPDATE_POST,
  DELETE_A_POST,
}