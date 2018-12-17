import React from 'react'
import moment from 'moment'

const Transaction = ({ transaction }) => (
  <React.Fragment>
    <tr>
      <td style={{ wordBreak: "break-all" }}>{transaction.id}</td>
      <td style={{ wordBreak: "break-all" }}>{transaction.source}</td>
      <td style={{ wordBreak: "break-all" }}>
        <span className="tag is-primary">{transaction.object}</span>
      </td>
      <td style={{ wordBreak: "break-all" }}>
      <span className="tag is-warning">{transaction.type}</span>
      </td>
      <td style={{ wordBreak: "break-all" }}>
        <span className="tag is-danger">{transaction.currency.toUpperCase()}</span>
      </td>
      <td style={{ wordBreak: "break-all" }}>{`
        ${transaction.amount.toString().substr(0, transaction.amount.toString().length - 2)}
        .
        ${transaction.amount.toString().substr((transaction.amount.toString().length - 2), transaction.amount.toString().length)}
      `}</td>
      <td style={{ wordBreak: "break-all" }}>{moment(transaction.created).format('LL')}</td>
      <td style={{ wordBreak: "break-all" }}>{moment(transaction.transferable).format('LL')}</td>
    </tr>
  </React.Fragment>
)

export default Transaction