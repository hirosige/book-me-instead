import React from 'react'
import { Query } from "react-apollo";
import { ROOM_TYPE_ENUM } from '../../queries/Enum'

const RoomMutationTable = props => (
  <React.Fragment>
    <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th className="c-table-cell u-w100"><abbr title="ID">ID</abbr></th>
          <th className="c-table-cell u-w200"><abbr title="NAME">Name</abbr></th>
          <th className="c-table-cell u-w200"><abbr title="ROOM_TYPE">Room Type</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="PRICE">Price</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="PEOPLE">People</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="PHOTOS">Photos</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="CONTROLS">Controls</abbr></th>
        </tr>
      </thead>
      <tbody>
        {props.hotel.rooms.length === 0 ? (
          <tr>
            <td colspan="7">
              <span className="tag is-warning" style={{ width: "100%" }}>
                No Rooms Added
              </span>
            </td>
          </tr>
        ) : (
          <React.Fragment>
            {props.hotel.rooms.map(room => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>
                  <input
                    id={room.id}
                    name="name"
                    className="input"
                    type="text"
                    placeholder="Room Name"
                    value={room.name}
                    onChange={props.handleRoomChange}
                  />
                </td>
                <td>
                  <span className="select">
                    <select
                      id={room.id}
                      className="u-no-br"
                      name="roomType"
                      onChange={props.handleRoomChange}
                      defaultValue={room.roomType}
                    >
                      <Query query={ROOM_TYPE_ENUM}>
                        {({ data, loading, error }) => {
                          if (loading) return 'loading'
                          if (error) return <div>Error {JSON.stringify(error)}</div>;

                          const { __type } = data

                          if (__type.enumValues.length === 0) {
                            return 'no data'
                          }

                          return (
                            <React.Fragment>
                              {__type.enumValues.map((enu, i) => (
                                <option
                                  key={i}
                                  value={enu.name}
                                >{enu.name}</option>
                              ))}
                            </React.Fragment>
                          )
                        }}
                      </Query>
                    </select>
                  </span>
                </td>
                <td>
                  <input
                    id={room.id}
                    name="price"
                    className="input"
                    type="text"
                    placeholder="Price"
                    value={room.price}
                    onChange={props.handleRoomChange}
                  />
                </td>
                <td>
                  <input
                    id={room.id}
                    name="people"
                    className="input"
                    type="text"
                    placeholder="People"
                    value={room.people}
                    onChange={props.handleRoomChange}
                  />
                </td>
                <td>[画像ボタン]</td>
                <td>
                  <div
                    className="button is-danger is-small"
                    onClick={props.deleteRoomFromState.bind(this, room.id)}
                  >
                    DELETE
                  </div>
                </td>
              </tr>
            ))}
          </React.Fragment>
        )}
      </tbody>
    </table>
    <div
      className="button is-primary is-small"
      onClick={props.addRoomToState}
    >
      ADD
    </div>
    <br />
    <span className="tag is-warning">いつの日かTODO: テーブルカラムのEllipsis</span><br />
    <span className="tag is-warning">いつの日かTODO: Roomの画像</span>
  </React.Fragment>
)

export default RoomMutationTable