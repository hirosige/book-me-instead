import gql from "graphql-tag";

const ROOM_TYPE_ENUM = gql`
  query enumRoomType {
  __type(name: "ROOM_TYPE") {
    name
    enumValues {
      name
    }
  }
}`

const ROLE_ENUM = gql`
  query enumRoomType {
  __type(name: "ROLE") {
    name
    enumValues {
      name
    }
  }
}`

export {
  ROOM_TYPE_ENUM,
  ROLE_ENUM
}