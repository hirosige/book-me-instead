import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { DELETE_A_COUNTRY } from '../../queries/Country'

const CountryDeleteMutation = ({ deleteId }) => (
  <ApolloConsumer>
    {client => (
      <div>
        <button
          className="button is-small is-danger"
          onClick={async () => {
            const { data } = await client.mutate({
              mutation: DELETE_A_COUNTRY,
              variables: { id: deleteId },
            });
            console.log(data)
          }}
        >
          DELETE
        </button>
      </div>
    )}
  </ApolloConsumer>
)

export default CountryDeleteMutation