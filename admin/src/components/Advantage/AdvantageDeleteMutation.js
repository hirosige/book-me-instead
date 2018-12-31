import React from 'react'
import {
  GET_ADVANTAGES,
  DELETE_AN_ADVANTAGE,
} from '../../queries/Advantage'
import { Mutation } from 'react-apollo';
import { produce } from 'immer';
import ButtonHasLoading from '../Shared/ButtonHasLoading';

const AdvantageDeleteMutation = ({
  advantage,
  indexVariables,
  notifyUser,
}) => {
  return (
    <Mutation mutation={DELETE_AN_ADVANTAGE}>
      {mutation => (
        <ButtonHasLoading
          title="DELETE AN ADVANTAGE"
          message="Are you sure to delete ?, This is irreversible!"
          caption="DELETE"
          className="button is-danger u-no-br"
          onClick={ async () => {
            await mutation({
              variables: {
                id: advantage.id,
              },
              update: (store, { data }) => {
                if (!data || !data.deleteAdvantage) {
                  return;
                }

                const advantages = store.readQuery({
                  query: GET_ADVANTAGES,
                  variables: indexVariables
                })

                store.writeQuery({
                  data: produce(advantages, ds => {
                    ds.allAdvantages.splice(
                      ds.allAdvantages.findIndex(advantage => advantage.id === data.deleteAdvantage.id
                    ), 1)
                  }),
                  query: GET_ADVANTAGES,
                  variables: indexVariables,
                })
              },
            })

            notifyUser({
              type: "is-success",
              message: "Advantage is successfully deleted"
            })
          }}
        />
      )}
    </Mutation>
  )
}

export default AdvantageDeleteMutation
