import React from 'react'
import TableContentsLoading from '../Shared/TableContentsLoading';

const TransactionTableLoading = props => {
  return (
    <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th className="c-table-cell u-w100"><abbr title="ID">ID</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Source">Charge ID</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Object">Object</abbr></th>
          <th className="c-table-cell u-w50"><abbr title="Type">Type</abbr></th>
          <th className="c-table-cell u-w50"><abbr title="Currency">Currency</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Amount">Amount</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Created">Created</abbr></th>
          <th className="c-table-cell u-w100"><abbr title="Transferable">Transferable</abbr></th>
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
            <td><TableContentsLoading /></td>
            <td><TableContentsLoading /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TransactionTableLoading
