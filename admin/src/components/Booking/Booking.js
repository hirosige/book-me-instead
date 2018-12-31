import React from 'react'
import moment from 'moment'

const Booking = ({
  booking,
  notifyUser,
  indexVariables
}) => {
  moment.locale('en')

  return (
    <tr>
      <td>{booking.id}</td>
      <td>
        {booking.isPaid ? (
          <span className="tag is-priamry">Paid</span>
        ) :(
          <span className="tag is-warning">Not Paid</span>
        )}
      </td>
      <td>
        {booking.isConfirmed ? (
          <span className="tag is-priamry">Confirmed</span>
        ) :(
          <span className="tag is-warning">Not Confirmed</span>
        )}
      </td>
      <td>{moment(booking.checkIn).format('LL')}</td>
      <td>{moment(booking.checkOut).format('LL')}</td>
      <td>{booking.hotel.name}</td>
      <td>{booking.user.email}</td>
    </tr>
  )
}

export default Booking