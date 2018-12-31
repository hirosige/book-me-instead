import React from 'react'

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
      <button
        className={`${this.props.className} ${this._onTransaction && "is-loading"}`}
        onClick={this.handleClick}
      >
        {this.props.caption}
      </button>
    )
  }
}

export default ButtonHasLoading
