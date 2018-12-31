import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';

class ButtonHasLoading extends React.PureComponent {
  _onTransaction = false

  toggleOnTransaction = () => {
    this._onTransaction = !this._onTransaction
  }

  handleClick = async () => {
    this.toggleOnTransaction()
    await this.props.onClick()
    this.toggleOnTransaction()
  }

  render () {
    return (
      <div>
        <header className="modal-card-head u-no-br u-bk-danger">
          <p className="modal-card-title u-txt-white">{this.props.title}</p>
          <div className="delete" aria-label="close" onClick={this.props.switchModal}></div>
        </header>
        <section className="modal-card-body u-txt-danger" style={{ zIndex: 9999, background: "#ffffff" }}>
          <div>{this.props.message}</div>
        </section>
        <footer className="modal-card-foot u-no-br">
          <button
            className={`${this.props.className} ${this._onTransaction && "is-loading"}`}
            onClick={this.handleClick}
          >
            {this.props.caption}
          </button>
          <div className="button u-no-br" onClick={this.props.switchModal}>NO</div>
        </footer>
      </div>
    )
  }
}

export default compose(
  withModal({
    button: 'DELETE',
    size: 'is-small',
    color: 'is-danger',
    type: 'card',
    style: {
      width: "30%"
    }
  })
)(ButtonHasLoading)
