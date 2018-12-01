import React from 'react';
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { ApolloConsumer } from 'react-apollo';
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'

const DeleteMutation = props => (
  <ApolloConsumer>
    {client => (
      <React.Fragment>
        <header className="modal-card-head no-br bk-danger">
          <p className="modal-card-title txt-white">{props.title}</p>
          <div className="delete" aria-label="close" onClick={props.switchModal}></div>
        </header>
        <section className="modal-card-body">
          {props.message}
        </section>
        <footer className="modal-card-foot no-br">
          <button
            className="button is-danger no-br"
            onClick={async () => {
              const { data } = await client.mutate({
                mutation: props.mutation,
                variables: { id: props.deleteId },
              });
            }}
          >YES</button>
          <div className="button no-br" onClick={props.switchModal}>NO</div>
        </footer>
      </React.Fragment>
    )}
  </ApolloConsumer>
)

export default compose(
  withModal({
    button: 'DELETE',
    size: 'is-small',
    color: 'is-danger',
  })
)(DeleteMutation)
