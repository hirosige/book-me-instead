import React from 'react'
import TableContentsLoading from '../Shared/TableContentsLoading';

const ContactTableLoading = props => {
  return (
    <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th className="u-w150"><abbr title="Inquery ID">Inquery ID</abbr></th>
          <th className="u-w150"><abbr title="Title">Title</abbr></th>
          <th className="u-w150"><abbr title="Description">Description</abbr></th>
          <th className="u-w50"><abbr title="IsReplied">Is Replied</abbr></th>
          <th className="u-w50"><abbr title="Reply">Reply</abbr></th>
          <th className="u-w100"><abbr title="Controls">Controls</abbr></th>
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

export default ContactTableLoading
