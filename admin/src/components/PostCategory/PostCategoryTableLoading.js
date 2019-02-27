import React from 'react'
import TableContentsLoading from '../Shared/TableContentsLoading';

const PostCategoryTableLoading = props => {
  return (
    <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th className="c-table-cell u-w150"><abbr title="Name">Name</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Posts">Posts</abbr></th>
          <th className="c-table-cell u-w200"><abbr title="Make Child Category">Make Child Category</abbr></th>
          <th className="c-table-cell u-w300"><abbr title="Breadcrumb">Breadcrumb</abbr></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={`postCategory-${i}`}>
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

export default PostCategoryTableLoading
