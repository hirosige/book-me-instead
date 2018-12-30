import React from 'react'
import {
  GET_COUNTRIES,
  DELETE_A_COUNTRY,
} from '../../queries/Country'
import { Mutation } from 'react-apollo';
import { produce } from 'immer';

const CountryDeleteMutation = ({ country, indexVariables }) => {
  return (
    <Mutation mutation={DELETE_A_COUNTRY}>
      {mutation => (
        <button
          className="button is-danger is-small"
          onClick={ async () => {
            const response = await mutation({
              variables: {
                id: country.id,
              },
              update: (store, { data }) => {
                if (!data || !data.deleteCountry) {
                  return;
                }

                const countries = store.readQuery({
                  query: GET_COUNTRIES,
                  variables: indexVariables
                })

                store.writeQuery({
                  data: produce(countries, ds => {
                    ds.allCountries.splice(
                      ds.allCountries.findIndex(country => country.id === data.deleteCountry.id
                    ), 1)
                  }),
                  query: GET_COUNTRIES,
                  variables: indexVariables,
                })
              },
            })
          }}
        >
          DELETE
        </button>
      )}
    </Mutation>
  )
}

export default CountryDeleteMutation
