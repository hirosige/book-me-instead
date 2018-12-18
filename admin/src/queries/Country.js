import gql from "graphql-tag";

const GET_COUNTRIES = gql`
  query PageCountries(
    $first: Int!
    $skip: Int!
    $searchFilter: CountryFilter
  ) {
    allCountries(
      filter: $searchFilter
      first: $first
      skip: $skip
      orderBy: updatedAt_DESC
    ) {
      id
      name
      code
      slug
      areas {
        id
        name
        code
        slug
      }
      hotels {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

const GET_AREAS_BY_COUNTRY = gql`
  query GetAreasByCountry(
    $id: ID!
  ) {
  Country(id: $id) {
    areas {
      id
      name
    }
  }
}
`

const GET_COUNTRY_COUNT = gql`
  query CountryCount(
    $searchFilter: CountryFilter
  ) {
    _allCountriesMeta(
      filter: $searchFilter
    ) {
      count
    }
  }
`

const CREATE_COUNTRY = gql`
  mutation CreateCountry(
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

const UPDATE_COUNTRY = gql`
  mutation UpdateCountry(
    $id: ID!
    $name: String!
    $code: String!
    $slug: String!
  ) {
    updateCountry(
      id: $id
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


const DELETE_A_COUNTRY = gql`
  mutation DeleteCountry($id: ID!) {
    deleteCountry(id: $id) {
      id
    }
  }
`;

export {
  GET_COUNTRIES,
  GET_AREAS_BY_COUNTRY,
  GET_COUNTRY_COUNT,
  CREATE_COUNTRY,
  UPDATE_COUNTRY,
  DELETE_A_COUNTRY,
}