import React from 'react'
import {
  GET_CONTACTS,
  DELETE_A_CONTACT,
} from '../../queries/Contact'
import { Mutation } from 'react-apollo';
import { produce } from 'immer';
import ButtonHasLoading from '../Shared/ButtonHasLoading'

const ContactDeleteMutation = ({
  contact,
  indexVariables,
  notifyUser,
}) => {
  return (
    <Mutation mutation={DELETE_A_CONTACT}>
      {mutation => (
        <ButtonHasLoading
          title="DELETE A CONTACT"
          message="Are you sure to delete ?, This is irreversible!"
          caption="DELETE"
          className="button is-danger u-no-br"
          onClick={ async () => {
            await mutation({
              variables: {
                id: contact.id,
              },
              update: (store, { data }) => {
                if (!data || !data.deleteContact) {
                  return;
                }

                const contacts = store.readQuery({
                  query: GET_CONTACTS,
                  variables: indexVariables
                })

                store.writeQuery({
                  data: produce(contacts, ds => {
                    ds.allContacts.splice(
                      ds.allContacts.findIndex(contact => contact.id === data.deleteContact.id
                    ), 1)
                  }),
                  query: GET_CONTACTS,
                  variables: indexVariables,
                })
              },
            })

            notifyUser({
              type: "is-success",
              message: "Contact is successfully deleted"
            })
          }}
        />
      )}
    </Mutation>
  )
}

export default ContactDeleteMutation
