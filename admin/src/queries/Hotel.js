import gql from "graphql-tag";

const GET_HOTELS = gql`
  query PageHotels(
    $first: Int!
    $skip: Int!
    $searchFilter: HotelFilter
  ) {
    allHotels(
      filter: $searchFilter
      first: $first
      skip: $skip
    ) {
      id
      name
      address
      latitude
      longitude
      appliances
      tel
      fax
      email
      isPublished
      country {
        id
      }
      area {
        id
      }
      photos {
        id
        name
        cdnUrl
        isImage
        isStored
        count
        uuid
        size
      }
    }
  }
`

const GET_HOTEL_COUNT = gql`
  query HotelCount(
    $searchFilter: HotelFilter
  ) {
    _allHotelsMeta(
      filter: $searchFilter
    ) {
      count
    }
  }
`

const CREATE_HOTEL = gql`
  mutation CreateHotel(
    $name: String!
    $address: String!
    $latitude: Float
    $longitude: Float
    $appliances: String!
    $tel: String!
    $fax: String!
    $email: String!
    $countryId: ID!
    $areaId: ID!
    $photoGrpName: String!
    $photoGrpCdnUrl: String!
    $photoGrpIsImage: Boolean!
    $photoGrpIsStored: Boolean!
    $photoGrpCount: Int!
    $photoGrpUuid: String!
    $photoGrpSize: Int!
  ) {
    createHotel(
      name: $name
      address: $address
      latitude: $latitude
      longitude: $longitude
      appliances: $appliances
      tel: $tel
      fax: $fax
      email: $email
      isPublished: false
      countryId: $countryId
      areaId: $areaId
      photos: {
        name: $photoGrpName
        cdnUrl: $photoGrpCdnUrl
        isImage: $photoGrpIsImage
        isStored: $photoGrpIsStored
        count: $photoGrpCount
        uuid: $photoGrpUuid
        size: $photoGrpSize
      }
    ) {
      id
    }
  }
`;

const UPDATE_HOTEL = gql`
  mutation UpdateHotel(
    $id: ID!
    $name: String!
    $address: String!
    $latitude: Float
    $longitude: Float
    $appliances: String!
    $tel: String!
    $fax: String!
    $email: String!
    $countryId: ID!
    $areaId: ID!
    $photoGrpId: ID!
    $photoGrpName: String!
    $photoGrpCdnUrl: String!
    $photoGrpIsImage: Boolean!
    $photoGrpIsStored: Boolean!
    $photoGrpCount: Int!
    $photoGrpUuid: String!
    $photoGrpSize: Int!
  ) {
    updateHotel(
      id: $id
      name: $name
      address: $address
      latitude: $latitude
      longitude: $longitude
      appliances: $appliances
      tel: $tel
      fax: $fax
      email: $email
      isPublished: false
      countryId: $countryId
      areaId: $areaId
      photosId: $photoGrpId
      photos: {
        name: $photoGrpName
        cdnUrl: $photoGrpCdnUrl
        isImage: $photoGrpIsImage
        isStored: $photoGrpIsStored
        count: $photoGrpCount
        uuid: $photoGrpUuid
        size: $photoGrpSize
      }
    ) {
      id
    }
  }
`;


const DELETE_AN_HOTEL = gql`
  mutation DeleteHotel($id: ID!) {
    deleteHotel(id: $id) {
      id
    }
  }
`;

export {
  GET_HOTELS,
  GET_HOTEL_COUNT,
  CREATE_HOTEL,
  UPDATE_HOTEL,
  DELETE_AN_HOTEL,
}