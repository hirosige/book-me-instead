import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import MapModal from '../Map/MapModal'

class TestMap extends React.Component {
  render () {
    return (
      <React.Fragment>
        <header className="modal-card-head u-no-br u-bk-primary">
          <p className="modal-card-title u-txt-white">Modal</p>
          <div className="delete" aria-label="close"></div>
        </header>
        <section className="modal-card-body u-txt-gray">
          <MapModal />
          <div style={{ height: "10px" }} />
        </section>
        <footer className="modal-card-foot u-no-br">
          <button className="button is-success u-no-br" type="submit">SUBMIT</button>
          <div className="button u-no-br">CANCEL</div>
        </footer>
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'CREATE COUNTRY',
    size: '',
    color: 'is-primary',
    type: 'card',
  })
)(TestMap)