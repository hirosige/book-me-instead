import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { UPDATE_HOTEL } from '../../queries/Hotel'
import HotelMutationForm from './HotelMutationForm'

class HotelEditMutation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.editItem,
      photoGrpId: props.editItem.photos ? props.editItem.photos.id : '',
      countryId: props.editItem.country.id,
      areaId: props.editItem.area.id,
      lat: props.editItem.latitude ? props.editItem.latitude : 0.0,
      lng: props.editItem.longitude ? props.editItem.longitude : 0.0,
    }
  }

  initializeState = () => { /* Do nothing for edit */ }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  setLatLng = ({ lat, lng }) => {
    this.setState({
      lat,
      lng
    })
  }

  handleChangePhoto = filesInfo => {
    console.log('done', filesInfo)

    this.setState({
      ...this.state,
      photoGrpName: filesInfo.name,
      photoGrpCdnUrl: filesInfo.cdnUrl,
      photoGrpIsImage: filesInfo.isImage,
      photoGrpIsStored: filesInfo.isStored,
      photoGrpCount: filesInfo.count,
      photoGrpUuid: filesInfo.uuid,
      photoGrpSize: filesInfo.size,
    })
  }

  render () {
    const { photos } = this.state

    return (
      <React.Fragment>
        <HotelMutationForm
          mutation={UPDATE_HOTEL}
          hotel={this.state}
          handleChange={this.handleChange}
          handleChangePhoto={this.handleChangePhoto}
          initializeState={this.initializeState}
          title="EDIT HOTEL"
          message="Hotel is Successfully updated."
          photoValue={photos ? photos.cdnUrl : ''}
          setLatLng={this.setLatLng}
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'EDIT',
    size: 'is-small',
    color: 'is-primary',
    type: 'card',
  })
)(HotelEditMutation)
