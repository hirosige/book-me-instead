import React from 'react'
import TableContentsLoading from '../Shared/TableContentsLoading';

const AdvantageTableLoading = props => {
  return (
    <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th><abbr title="Name">Name</abbr></th>
          <th><abbr title="Icon">Icon</abbr></th>
          <th><abbr title="Controls">Controls</abbr></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr>
            <td><TableContentsLoading /></td>
            <td><TableContentsLoading /></td>
            <td><TableContentsLoading /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AdvantageTableLoading
