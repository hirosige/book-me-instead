import React from 'react';
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { ApolloConsumer } from 'react-apollo';
// import Danger from '../Notification/Danger'
// import Success from '../Notification/Success'

const DeleteMutation = props => (
  <ApolloConsumer>
    {client => (
      <React.Fragment>
        <header className="modal-card-head u-no-br u-bk-danger">
          <p className="modal-card-title u-txt-white">{props.title}</p>
          <div className="delete" aria-label="close" onClick={props.switchModal}></div>
        </header>
        <footer className="modal-card-foot u-no-br">
          <button
            className="button is-danger u-no-br"
            onClick={async () => {
              await client.mutate({
                mutation: props.mutation,
                variables: { id: props.deleteId },
              });
            }}
          >YES</button>
          <div className="button u-no-br" onClick={props.switchModal}>NO</div>
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
    style: {
      width: "30%"
    }
  })
)(DeleteMutation)
