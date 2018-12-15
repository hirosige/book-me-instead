import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import SimpleMap from './SimpleMap'

class MapModal extends React.Component {
  state = {
    location: {
      lat: this.props.lat ? this.props.lat : 13.7567659003275,
      lng: this.props.lng ? this.props.lng : 100.492005561096,
    },
    isSelected: false
  }

  setLatLng = ({lat, lng}) => {
    this.setState({
      location: { lat, lng }
    })
  }

  sendLatLng = () => {
    this.props.setLatLng({
      lat: this.state.location.lat,
      lng: this.state.location.lng,
    })
    this.props.switchModal()
  }

  setIsSelected = () => {
    this.setState({ isSelected: true })
  }

  render () {

    return (
      <React.Fragment>
        <header className="modal-card-head u-no-br u-bk-primary">
          <p className="modal-card-title u-txt-white">{this.props.title}</p>
          <div className="delete" aria-label="close" onClick={this.props.switchModal}></div>
        </header>
        <div className="notification is-primary" style={{ marginBottom: 0, borderRadius: 0, fontSize: "1.1rem", padding: "10px" }}>
          Please find hotel spot and click the point
        </div>
        <section className="modal-card-body" style={{
          height: "400px",
          padding: 0
        }}>
          <SimpleMap
            lat={this.state.location.lat}
            lng={this.state.location.lng}
            zoom={14}
            isMarkerShown={true}
            setLatLng={this.setLatLng}
            setIsSelected={this.setIsSelected}
          />
        </section>
        <footer className="modal-card-foot">
          {this.state.isSelected && (
            <span
              className="button is-primary"
              onClick={this.sendLatLng}
            >Here is the correct place</span>
          )}
          <div className="button">Cancel</div>
        </footer>
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'FIND PLACE',
    size: 'is-small',
    color: 'is-primary',
    type: 'card',
  })
)(MapModal)