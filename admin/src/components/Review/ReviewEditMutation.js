import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { UPDATE_REVIEW } from '../../queries/Review'
import ReviewMutationForm from './ReviewMutationForm'

class ReviewEditMutation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.editItem,
      hotelId: props.editItem.hotel.id,
      userId: props.editItem.user.id,
    }
  }

  initializeState = () => { /* Do nothing for edit */ }

  handleChange = (e) => {
    console.log(e)
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
          mutation={UPDATE_REVIEW}
          review={this.state}
          handleChange={this.handleChange}
          handleChangeStar={this.handleChangeStar}
          initializeState={this.initializeState}
          title="UPDATE REVIEW"
          checkError={this.checkError}
          message="Review is Successfully updated."
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
)(ReviewEditMutation)
