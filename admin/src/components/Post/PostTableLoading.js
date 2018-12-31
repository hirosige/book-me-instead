import React from 'react'
import TableContentsLoading from '../Shared/TableContentsLoading';

const PostTableLoading = props => {
  return (
    <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th className="c-table-cell u-w100"><abbr title="Title">Title</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="MdContents">Markdown Contents</abbr></th>
          <th className="c-table-cell u-w200"><abbr title="Category">Category</abbr></th>
          <th className="c-table-cell u-w50"><abbr title="Hero">Heros</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Photos">Photos</abbr></th>
          <th className="c-table-cell u-w200"><abbr title="Tags">Tags</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Controls">Controls</abbr></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={`post-${i}`}>
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

export default PostTableLoading
