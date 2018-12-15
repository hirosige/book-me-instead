import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { UPDATE_COUNTRY } from '../../queries/Country'
import CountryMutationForm from './CountryMutationForm'

class CountryEditMutation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.editItem,
    }
  }

  initializeState = () => { /* Do nothing for edit */ }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  checkError = (error, column) => {
    if (error.graphQLErrors[0].functionError[column].length !== 0) {
      return "is-danger"
    }
    return ""
  }

  render () {
    return (
      <React.Fragment>
        <CountryMutationForm
          mutation={UPDATE_COUNTRY}
          country={this.state}
          handleChange={this.handleChange}
          initializeState={this.initializeState}
          title="UPDATE COUNTRY"
          checkError={this.checkError}
          message="Country is Successfully updated."
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
)(CountryEditMutation)