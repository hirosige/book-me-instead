import React from 'react'
import {
  GET_COUNTRIES,
  DELETE_A_COUNTRY,
} from '../../queries/Country'
import { Mutation } from 'react-apollo';
import { produce } from 'immer';
import ButtonHasLoading from '../Shared/ButtonHasLoading'

const CountryDeleteMutation = ({
  country,
  indexVariables,
}) => {
  return (
    <Mutation mutation={DELETE_A_COUNTRY}>
      {mutation => (
        <ButtonHasLoading
          title="DELETE A COUNTRY"
          message="Are you sure to delete ?, This is irreversible!"
          caption="DELETE"
          className="button is-danger u-no-br"
          onClick={ async () => {
            await mutation({
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
        />
      )}
    </Mutation>
  )
}

export default CountryDeleteMutation
