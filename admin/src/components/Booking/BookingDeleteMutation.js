import React from 'react'
import {
  GET_BOOKINGS,
  DELETE_A_BOOKING,
} from '../../queries/Booking'
import { Mutation } from 'react-apollo';
import { produce } from 'immer';
import ButtonHasLoading from '../Shared/ButtonHasLoading'

const BookingDeleteMutation = ({
  booking,
  indexVariables,
}) => {
  return (
    <Mutation mutation={DELETE_A_BOOKING}>
      {mutation => (
        <ButtonHasLoading
          caption="DELETE"
          className={`button is-danger is-small u-no-br`}
          onClick={ async () => {
            await mutation({
              variables: {
                id: booking.id,
              },
              update: (store, { data }) => {
                if (!data || !data.deleteBooking) {
                  return;
                }

                const bookings = store.readQuery({
                  query: GET_BOOKINGS,
                  variables: indexVariables
                })

                store.writeQuery({
                  data: produce(bookings, ds => {
                    ds.allBookings.splice(
                      ds.allBookings.findIndex(booking => booking.id === data.deleteBooking.id
                    ), 1)
                  }),
                  query: GET_BOOKINGS,
                  variables: indexVariables,
                })
              },
            })
          }}
        />
      )}
    </Mutation>
  )
}

export default BookingDeleteMutation
