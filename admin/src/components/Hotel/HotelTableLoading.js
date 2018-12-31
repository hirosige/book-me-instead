import React from 'react'
import TableContentsLoading from '../Shared/TableContentsLoading';

const HotelTableLoading = props => {
  return (
    <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th className="c-table-cell u-w100"><abbr title="Name">Name</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Breed">Code</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Slug">Slug</abbr></th>
          <th className="c-table-cell u-w250"><abbr title="Areas">Areas</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Hotels">Hotels</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Controls">Controls</abbr></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr>
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

export default HotelTableLoading
