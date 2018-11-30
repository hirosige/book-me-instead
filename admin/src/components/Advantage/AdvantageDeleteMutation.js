import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { DELETE_AN_ADVANTAGE } from '../../queries/Advantage'

const AdvantageDeleteMutation = ({ deleteId }) => (
  <ApolloConsumer>
    {client => (
      <div>
        <button
          className="button is-small is-danger"
          onClick={async () => {
            const { data } = await client.mutate({
              mutation: DELETE_AN_ADVANTAGE,
              variables: { id: deleteId },
            });
          }}
        >
          DELETE
        </button>
      </div>
    )}
  </ApolloConsumer>
)

export default AdvantageDeleteMutation