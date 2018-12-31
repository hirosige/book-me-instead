import React from 'react'
import TableContentsLoading from '../Shared/TableContentsLoading';

const UserTableLoading = props => {
  return (
    <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th className="c-table-cell u-w200"><abbr title="Email">Email</abbr></th>
          <th className="c-table-cell u-w200"><abbr title="Auth0 User ID">Auth0 User ID</abbr></th>
          <th className="c-table-cell u-w200"><abbr title="Omise Customer ID">Omise Customer ID</abbr></th>
          <th className="c-table-cell u-w150"><abbr title="Role">Role</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Favorites">Favorites</abbr></th>
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

export default UserTableLoading
