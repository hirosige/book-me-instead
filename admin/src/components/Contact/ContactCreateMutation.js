import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { CREATE_CONTACT } from '../../queries/Contact'
import ContactMutationForm from './ContactMutationForm'

class ContactCreateMutation extends React.Component {
  state = {
    name: "",
    email: "",
    tel: "",
    title: "",
    reference: "",
    description: "",
    isReplied: false,
  }

  initializeState = () => {
    this.setState({
      name: "",
      email: "",
      tel: "",
      title: "",
      reference: "",
      description: "",
      isReplied: false,
    })
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  checkError = (error, column) => {
    try {
      if (error.graphQLErrors[0].functionError[column].length !== 0) {
        return "is-danger"
      }
    } catch(e) {
      console.log(e)
    }
    return ""
  }

  render () {
    return (
      <React.Fragment>
        <ContactMutationForm
          mutation={CREATE_CONTACT}
          contact={this.state}
          handleChange={this.handleChange}
          initializeState={this.initializeState}
          title="CREATE CONTACT"
          message="Contact is Successfully created."
          checkError={this.checkError}
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'CREATE CONTACT',
    size: '',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "90%"
    }
  })
)(ContactCreateMutation)
