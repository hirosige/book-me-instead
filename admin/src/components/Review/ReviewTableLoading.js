import React from 'react'
import TableContentsLoading from '../Shared/TableContentsLoading';

const ReviewTableLoading = props => {
  return (
    <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th className="c-table-cell u-w100"><abbr title="Rating">Rating</abbr></th>
          <th className="c-table-cell u-w200"><abbr title="Description">Description</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Reviewer">Reviewer</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Hotel">Target Hotel</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Controls">Controls</abbr></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={`review-${i}`}>
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

export default ReviewTableLoading
