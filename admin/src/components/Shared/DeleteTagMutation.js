import React from 'react';
import { ApolloConsumer } from 'react-apollo';

const DeleteTagMutation = props => (
  <ApolloConsumer>
    {client => (
      <React.Fragment>
        <button
          className="delete is-small"
          onClick={async () => {
            await client.mutate({
              mutation: props.mutation,
              variables: { id: props.deleteId },
            });
          }}
        />
      </React.Fragment>
    )}
  </ApolloConsumer>
)

export default DeleteTagMutation
