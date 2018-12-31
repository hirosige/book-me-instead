import React from 'react'

const Contact = ({
  contact,
  notifyUser,
  indexVariables
}) => {

  return (
    <tr>
      <td className="c-table-cell">{contact.id}</td>
      <td className="c-table-cell">{contact.title}</td>
      <td className="c-table-cell">{contact.description}</td>
      <td className="c-table-cell">
        {contact.isReplied ? (
          <span className="tag is-primary">Replied</span>
        ) : (
          <span className="tag is-warning">Not Yet</span>
        )}
      </td>
      <td className="c-table-cell"></td>
      <td className="c-table-cell"></td>
    </tr>
  )
}

export default Contact
