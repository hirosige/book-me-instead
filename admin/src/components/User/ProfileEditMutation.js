import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { UPDATE_PROFILE } from '../../queries/User'
import ProfileMutationForm from './ProfileMutationForm';

class ProfileEditMutation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.editItem.profile,
      userId: props.editItem.id
    }
  }

  initializeState = () => { /* Do nothing for edit */ }

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
          mutation={UPDATE_PROFILE}
          profile={this.state}
          handleChange={this.handleChange}
          initializeState={this.initializeState}
          title="UPDATE PROFILE"
          message="Profile is Successfully updated."
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'EDIT PROFILE',
    size: 'is-small',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "60%"
    },
  })
)(ProfileEditMutation)