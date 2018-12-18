import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { CREATE_PROFILE } from '../../queries/User'
import ProfileMutationForm from './ProfileMutationForm';

class ProfileCreateMutation extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    address: "",
    tel: "",
    subscriptionEmail: "",
    passportNo: "",
    userId: this.props.user.id
  }

  initializeState = () => {
    this.setState({
      firstName: "",
      lastName: "",
      address: "",
      tel: "",
      passportNo: "",
      subscriptionEmail: "",
    })
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  render () {
    return (
      <React.Fragment>
        <ProfileMutationForm
          mutation={CREATE_PROFILE}
          profile={this.state}
          handleChange={this.handleChange}
          initializeState={this.initializeState}
          title="CREATE PROFILE"
          message="Profile is Successfully created."
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'CREATE PROFILE',
    size: 'is-small',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "60%"
    },
  })
)(ProfileCreateMutation)