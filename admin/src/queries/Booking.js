import gql from "graphql-tag";

const GET_BOOKINGS = gql`
  query PageBookings(
    $first: Int!
    $skip: Int!
    $searchFilter: BookingFilter
  ) {
    allBookings(
      filter: $searchFilter
      first: $first
      skip: $skip
    ) {
      id
      isPaid
      isConfirmed
      checkIn
      checkOut
      hotel {
        id
        name
      }
      user {
        id
        email
      }
    }
  }
`

const GET_BOOKING_COUNT = gql`
  query BookingCount(
    $searchFilter: BookingFilter
  ) {
    _allBookingsMeta(
      filter: $searchFilter
    ) {
      count
    }
  }
`


const CREATE_BOOKING = gql`
  mutation CreateBooking(
    $isPaid: Boolean!
    $isConfirmed: Boolean!
    $checkIn: DateTime!
    $checkOut: DateTime!
    $hotelId: ID!
    $userId: ID!
  ) {
    createBooking(
      isPaid: $isPaid
      isConfirmed: $isConfirmed
      checkIn: $checkIn
      checkOut: $checkOut
      hotelId: $hotelId
      userId: $userId
    ) {
      id
    }
  }
`

export {
  GET_BOOKINGS,
  GET_BOOKING_COUNT,
  CREATE_BOOKING,
}