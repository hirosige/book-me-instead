import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { UPDATE_HOTEL } from '../../queries/Hotel'
import HotelMutationForm from './HotelMutationForm'

class HotelEditMutation extends React.Component {
  constructor(props) {
    super(props)

    const removedKeyAdvantages =
      props.editItem.advantages
        .map(advantage => {
          return advantage.id
        })

    this.state = {
      ...props.editItem,
      photoGrpId: props.editItem.photos ? props.editItem.photos.id : '',
      countryId: props.editItem.country.id,
      areaId: props.editItem.area.id,
      lat: props.editItem.latitude ? props.editItem.latitude : 0.0,
      lng: props.editItem.longitude ? props.editItem.longitude : 0.0,
      advantages: removedKeyAdvantages,
    }
  }

  initializeState = () => { /* Do nothing for edit */ }

  handleRoomChange = e => {
    const newRooms = this.state.rooms
      .map(room => {
        if (room.id === e.target.id) {
          return {
            ...room,
            [e.target.name]: e.target.value,
          }
        }
        return room
      })

    this.setState({
      ...this.state,
      rooms: newRooms
    })
  }

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

  handleCheckBox = e => {
    if (e.target.checked) {
      this.setState({
        advantages: this.state.advantages.concat(e.target.id)
      })
    } else {
      this.setState({
        advantages: this.state.advantages.filter(advantage => {
          return e.target.id !== advantage
        })
      })
    }
  }

  handleChangePhoto = filesInfo => {
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

  deleteRoomFromState = deletingId => {
    const newRooms = this.state.rooms
      .filter(room => {
        return room.id !== deletingId
      })
      .map((room, index) => {
        return {
          ...room,
          id: `tmpId-${index + 1}`
        }
      })

    this.setState({ rooms: newRooms })
  }

  addRoomToState = () => {
    const { rooms } = this.state
    const count = rooms.length

    this.setState({
      rooms: rooms.concat({
        id: `tmpId-${count + 1}`,
        name: "",
        roomType: "SUPERIOR",
        price: 0,
        people: 0,
        photos: []
      })
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
          addRoomToState={this.addRoomToState}
          deleteRoomFromState={this.deleteRoomFromState}
          handleRoomChange={this.handleRoomChange}
          handleCheckBox={this.handleCheckBox}
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
    style: {
      width: "90%"
    },
  })
)(HotelEditMutation)
