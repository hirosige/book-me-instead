import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { CREATE_HOTEL } from '../../queries/Hotel'
import HotelMutationForm from './HotelMutationForm'

class HotelCreateMutation extends React.Component {
  state = {
    name: "",
    address: "",
    lat: 0.0,
    lng: 0.0,
    appliances: "",
    tel: "",
    fax: "",
    email: "",
    countryId: "",
    areaId: "",
    rooms: [],
    advantages: [],
  }

  initializeState = () => {
    this.setState({
      name: "",
      address: "",
      lat: 0.0,
      lng: 0.0,
      appliances: "",
      tel: "",
      fax: "",
      email: "",
      countryId: "",
      areaId: "",
      rooms: [],
      advantages: [],
    })
  }

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
      [e.target.name]: e.target.value
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

  setLatLng = ({ lat, lng }) => {
    this.setState({
      lat,
      lng
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

  render () {
    return (
      <React.Fragment>
        <HotelMutationForm
          mutation={CREATE_HOTEL}
          hotel={this.state}
          handleChange={this.handleChange}
          handleChangePhoto={this.handleChangePhoto}
          initializeState={this.initializeState}
          title="CREATE HOTEL"
          message="Hotel is Successfully created."
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
    button: 'CREATE HOTEL',
    size: '',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "90%"
    },
  })
)(HotelCreateMutation)