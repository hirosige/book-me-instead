import gql from "graphql-tag";

const CREATE_AREA = gql`
  mutation CreateArea(
    $countryId: ID!
    $name: String!
    $code: String!
    $slug: String!
  ) {
    createArea(
      input: {
        name: $name
        code: $code
        slug: $slug
        countryId: $countryId
      }
    ) {
      id
      name
      code
      slug
    }
  }
`;

export {
  CREATE_AREA,
}
