import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { UPDATE_ADVANTAGE } from '../../queries/Advantage'
import AdvantageMutationForm from './AdvantageMutationForm'

class AdvantageEditMutation extends React.Component {
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

  handleChangePhoto = fileInfo => {

    this.setState({
      ...this.state,
      iconName: fileInfo.name,
      iconCdnUrl: fileInfo.cdnUrl,
      iconIsImage: fileInfo.isImage,
      iconIsStored: fileInfo.isStored,
      iconMimeType: fileInfo.mimeType,
      iconUuid: fileInfo.uuid,
      iconSize: fileInfo.size,
    })
  }

  render () {
    const { icon } = this.state

    return (
      <React.Fragment>
        <AdvantageMutationForm
          mutation={UPDATE_ADVANTAGE}
          advantage={this.state}
          handleChange={this.handleChange}
          handleChangePhoto={this.handleChangePhoto}
          initializeState={this.initializeState}
          title="EDIT ADVANTAGE"
          message="Advantage is Successfully updated."
          photoValue={icon ? icon.cdnUrl : ''}
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
)(AdvantageEditMutation)