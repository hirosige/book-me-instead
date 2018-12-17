import React from 'react'
import BookRoomButton from './BookRoomButton';

const Rooms = ({ rooms, me, hotel }) => (
  <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th><abbr title="Name">Name</abbr></th>
        <th><abbr title="RoomType">RoomType</abbr></th>
        <th><abbr title="Price">Price</abbr></th>
        <th><abbr title="People">Capacity</abbr></th>
        <th><abbr title="Controls">Controls</abbr></th>
      </tr>
    </thead>
    <tbody>
      {rooms.map(room => (
        <tr key={room.id}>
          <td>{room.name}</td>
          <td>{room.roomType}</td>
          <td>{room.price}</td>
          <td>{room.people}</td>
          <td>
            <BookRoomButton
              user={me}
              hotel={hotel}
              room={room}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default Rooms
