import React from 'react'
import { Mutation } from 'react-apollo';
import { produce } from 'immer';
import ButtonHasLoading from '../Shared/ButtonHasLoading'
import {
  DELETE_A_USER,
  GET_USERS,
} from '../../queries/User';

const UserDeleteMutation = ({
  user,
  indexVariables,
  notifyUser,
}) => {
  return (
    <Mutation mutation={DELETE_A_USER}>
      {mutation => (
        <ButtonHasLoading
          title="DELETE A USER"
          message="Are you sure to delete ?, This is irreversible!"
          caption="DELETE"
          className="button is-danger u-no-br"
          onClick={ async () => {
            await mutation({
              variables: {
                id: user.id,
              },
              update: (store, { data }) => {
                if (!data || !data.deleteUser) {
                  return;
                }

                const users = store.readQuery({
                  query: GET_USERS,
                  variables: indexVariables
                })

                store.writeQuery({
                  data: produce(users, ds => {
                    ds.allUsers.splice(
                      ds.allUsers.findIndex(user => user.id === data.deleteUser.id
                    ), 1)
                  }),
                  query: GET_USERS,
                  variables: indexVariables,
                })
              },
            }).then(_ => {
              notifyUser({
                type: "is-success",
                message: "User is successfully deleted"
              })
            }).catch(error => {
              notifyUser({
                type: "is-danger",
                message: error.message
              })
            })
          }}
        />
      )}
    </Mutation>
  )
}

export default UserDeleteMutation
