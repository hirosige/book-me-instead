import gql from "graphql-tag";

const CREATE_FILE = gql`
  mutation CreateFile(
    $name: String!
    $code: String!
    $slug: String!
  ) {
    createCountry(
      name: $name
      code: $code
      slug: $slug
    ) {
      id
      name
      code
      slug
    }
  }
`;

export {
  CREATE_FILE,
}