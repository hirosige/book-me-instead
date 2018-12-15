import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { CREATE_COUNTRY } from '../../queries/Country'
import CountryMutationForm from './CountryMutationForm'

class CountryCreateMutation extends React.Component {
  state = {
    name: "",
    code: "",
    slug: "",
  }

  initializeState = () => {
    this.setState({
      name: "",
      code: "",
      slug: "",
    })
  }

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
          mutation={CREATE_COUNTRY}
          country={this.state}
          handleChange={this.handleChange}
          initializeState={this.initializeState}
          title="CREATE COUNTRY"
          message="Country is Successfully created."
          checkError={this.checkError}
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'CREATE COUNTRY',
    size: '',
    color: 'is-primary',
    type: 'card',
  })
)(CountryCreateMutation)