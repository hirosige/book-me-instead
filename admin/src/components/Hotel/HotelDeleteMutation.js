import React from 'react'
import {
  GET_HOTELS,
  DELETE_AN_HOTEL,
} from '../../queries/Hotel'
import { Mutation } from 'react-apollo';
import { produce } from 'immer';
import ButtonHasLoading from '../Shared/ButtonHasLoading'

const HotelDeleteMutation = ({
  hotel,
  indexVariables,
}) => {
  return (
    <Mutation mutation={DELETE_AN_HOTEL}>
      {mutation => (
        <ButtonHasLoading
          caption="DELETE"
          className={`button is-danger is-small u-no-br`}
          onClick={ async () => {
            await mutation({
              variables: {
                id: hotel.id,
              },
              update: (store, { data }) => {
                if (!data || !data.deleteHotel) {
                  return;
                }

                const hotels = store.readQuery({
                  query: GET_HOTELS,
                  variables: indexVariables
                })

                store.writeQuery({
                  data: produce(hotels, ds => {
                    ds.allHotels.splice(
                      ds.allHotels.findIndex(hotel => hotel.id === data.deleteHotel.id
                    ), 1)
                  }),
                  query: GET_HOTELS,
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

export default HotelDeleteMutation
