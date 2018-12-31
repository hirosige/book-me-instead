import React from 'react'
import TableContentsLoading from '../Shared/TableContentsLoading';

const HotelTableLoading = props => {
  return (
    <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th><abbr title="Name">Name</abbr></th>
          <th><abbr title="Rooms">Rooms</abbr></th>
          <th><abbr title="Relations">Relations</abbr></th>
          <th><abbr title="isPublished">isPublished</abbr></th>
          <th><abbr title="Controls">Controls</abbr></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={`hotel-${i}`}>
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

export default HotelTableLoading
