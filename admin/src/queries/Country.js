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
    ) {
      id
      name
      code
      slug
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

const DELETE_A_COUNTRY = gql`
  mutation DeleteCountry($id: ID!) {
    deleteCountry(id: $id) {
      id
    }
  }
`;

export {
  GET_COUNTRIES,
  GET_COUNTRY_COUNT,
  CREATE_COUNTRY,
  DELETE_A_COUNTRY
}