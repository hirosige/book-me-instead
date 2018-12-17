import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { CREATE_BOOKING } from '../../queries/Booking'
import BookMutationForm from './BookMutationForm';

class BookRoomButton extends React.Component {
  state = {
    booking: {
      isPaid: false,
      isConfirmed: false,
      checkIn: new Date(),
      checkOut: new Date(),
      hotelId: this.props.hotel.id,
      userId: this.props.user.id,
    },
    charge: {
      amount: this.props.room.price * 100,
      currency: "thb",
      customerId: this.props.user.omiseCustomerId,
      description: `${this.props.hotel.name}/${this.props.room.name}`,
    }
  }

  initializeState = () => {
    this.setState({
      booking: {
        isPaid: false,
        isConfirmed: false,
        checkIn: new Date(),
        checkOut: new Date(),
        hotelId: this.props.hotel.id,
        userId: this.props.user.id,
      },
      charge: {
        amount: this.props.room.price,
        currency: "thb",
        customerId: this.props.user.omiseCustomerId,
        description: `${this.props.hotel.name}/${this.props.room.name}`,
      }
    })
  }

  handleBookingChange = (e) => {
    this.setState({
      booking: {
        ...this.state,
        [e.target.name]: e.target.value
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        <BookMutationForm
          mutation={CREATE_BOOKING}
          booking={this.state.booking}
          charge={this.state.charge}
          handleBookingChange={this.handleBookingChange}
          initializeState={this.initializeState}
          title="BOOK ROOM"
          message="Booking is Successfully created."
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'BOOK HERE!',
    size: 'is-small',
    color: 'is-primary',
    type: 'card',
  })
)(BookRoomButton)