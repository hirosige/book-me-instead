import React from 'react'
import ContactDeleteMutation from './ContactDeleteMutation';

const Contact = ({
  contact,
  notifyUser,
  indexVariables,
  onedayTodoHere,
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
      <td className="c-table-cell">
        <div className="field has-addons">
          <div className="control">
            <ContactDeleteMutation
              contact={contact}
              notifyUser={notifyUser}
              indexVariables={indexVariables}
            />
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Contact
