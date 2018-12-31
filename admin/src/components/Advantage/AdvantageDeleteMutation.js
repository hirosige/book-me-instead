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
  indexVariables
}) => {
  return (
    <Mutation mutation={DELETE_AN_ADVANTAGE}>
      {mutation => (
        <ButtonHasLoading
          caption="DELETE"
          className="button is-danger is-small"
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
          }}
        />
      )}
    </Mutation>
  )
}

export default AdvantageDeleteMutation
