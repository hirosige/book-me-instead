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
  notifyUser,
}) => {
  return (
    <Mutation mutation={DELETE_A_BOOKING}>
      {mutation => (
        <ButtonHasLoading
          title="DELETE A BOOKING"
          message="Are you sure to delete ?, This is irreversible!"
          caption="DELETE"
          className="button is-danger u-no-br"
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

            notifyUser({
              type: "is-success",
              message: "Booking is successfully deleted"
            })
          }}
        />
      )}
    </Mutation>
  )
}

export default BookingDeleteMutation
