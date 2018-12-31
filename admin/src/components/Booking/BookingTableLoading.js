import React from 'react'
import TableContentsLoading from '../Shared/TableContentsLoading';

const BookingTableLoading = props => {
  return (
    <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th><abbr title="BookingID">Booking ID</abbr></th>
          <th><abbr title="IsPaid">Customer Paid?</abbr></th>
          <th><abbr title="IsConfirmed">Staff Confirmed?</abbr></th>
          <th><abbr title="CheckIn">CheckIn</abbr></th>
          <th><abbr title="CheckOut">CheckOut</abbr></th>
          <th><abbr title="Hotel">Hotel</abbr></th>
          <th><abbr title="User">User</abbr></th>
          <th><abbr title="Controls">Controls</abbr></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={`booking-${i}`}>
            <td><TableContentsLoading /></td>
            <td><TableContentsLoading /></td>
            <td><TableContentsLoading /></td>
            <td><TableContentsLoading /></td>
            <td><TableContentsLoading /></td>
            <td><TableContentsLoading /></td>
            <td><TableContentsLoading /></td>
            <td><TableContentsLoading /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BookingTableLoading
