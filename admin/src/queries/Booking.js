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
      orderBy: updatedAt_DESC
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
      createdAt
      updatedAt
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
      input: {
        isPaid: $isPaid
        isConfirmed: $isConfirmed
        checkIn: $checkIn
        checkOut: $checkOut
        hotelId: $hotelId
        userId: $userId
      }
    ) {
      id
    }
  }
`

const DELETE_A_BOOKING = gql`
  mutation DeleteBooking(
    $id: ID!
  ) {
    deleteBooking(
      input: {
        id: $id
      }
    ) {
      id
    }
  }
`

export {
  GET_BOOKINGS,
  GET_BOOKING_COUNT,
  CREATE_BOOKING,
  DELETE_A_BOOKING,
}
