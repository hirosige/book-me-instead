import React from 'react'
import { Mutation } from 'react-apollo';
import { UPDATE_IS_PUBLISHED } from '../../queries/Hotel'

const PublishHotelButton = props => (
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
                isPublished: true
              }
            }).then(result => {
              console.log(result)
            });
          }}
          className="button is-small is-primary u-no-br"
        >
          Make Published
        </button>
      </React.Fragment>
    )}
  </Mutation>
)

export default PublishHotelButton