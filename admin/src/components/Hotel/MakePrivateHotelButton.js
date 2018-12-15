import React from 'react'
import { Mutation } from 'react-apollo';
import { UPDATE_IS_PUBLISHED } from '../../queries/Hotel'

const MakePrivateHotelButton = props => (
  <Mutation mutation={UPDATE_IS_PUBLISHED}>
    {(mutate, { data, loading, error }) => (
      <React.Fragment>
        {error && (<div>tmp: {error.message}</div>)}
        <button
          onClick={e => {
            e.preventDefault();

            mutate({
              variables: {
                id: props.hotel.id,
                isPublished: false
              }
            }).then(result => {
              console.log(result)
            });
          }}
          className="button is-small is-danger u-no-br"
        >
          Make Private
        </button>
      </React.Fragment>
    )}
  </Mutation>
)

export default MakePrivateHotelButton
