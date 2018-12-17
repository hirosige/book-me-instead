import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { CREATE_REVIEW } from '../../queries/Review'
import ReviewMutationForm from '../Review/ReviewMutationForm'

class ReviewButton extends React.Component {
  state = {
    rating: "",
    description: "",
    userId: this.props.user.id,
    hotelId: this.props.hotel.id,
  }

  initializeState = () => {
    this.setState({
      rating: "",
      description: "",
      userId: this.props.user.id,
      hotelId: this.props.hotel.id,
    })
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  handleChangeStar = value => {
    this.setState({
      ...this.state,
      rating: value,
    })
  }

  checkError = (error, column) => {
    if (error.graphQLErrors[0].functionError && error.graphQLErrors[0].functionError[column].length !== 0) {
      return "is-danger"
    }
    return ""
  }

  render () {
    return (
      <React.Fragment>
        <ReviewMutationForm
          mutation={CREATE_REVIEW}
          review={this.state}
          handleChange={this.handleChange}
          handleChangeStar={this.handleChangeStar}
          initializeState={this.initializeState}
          title="CREATE REVIEW"
          message="Review is Successfully created."
          checkError={this.checkError}
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'REVIEW THIS',
    size: 'is-small',
    color: 'is-primary',
    type: 'card',
  })
)(ReviewButton)
