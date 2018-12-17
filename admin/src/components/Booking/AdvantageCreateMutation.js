import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { CREATE_ADVANTAGE } from '../../queries/Advantage'
import AdvantageMutationForm from './AdvantageMutationForm'

class AdvantageCreateMutation extends React.Component {
  state = {
    name: "",
    iconName: "",
    iconCdnUrl: "",
    iconIsImage: false,
    iconIsStored: false,
    iconMimeType: "",
    iconUuid: "",
    iconSize: 0,
  }

  initializeState = () => {
    this.setState({
      name: "",
      iconName: "",
      iconCdnUrl: "",
      iconIsImage: false,
      iconIsStored: false,
      iconMimeType: "",
      iconUuid: "",
      iconSize: 0,
    })
  }

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
    return (
      <React.Fragment>
        <AdvantageMutationForm
          mutation={CREATE_ADVANTAGE}
          advantage={this.state}
          handleChange={this.handleChange}
          handleChangePhoto={this.handleChangePhoto}
          initializeState={this.initializeState}
          title="CREATE ADVANTAGE"
          message="Advantage is Successfully created."
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'CREATE ADVANTAGE',
    size: '',
    color: 'is-primary',
    type: 'card',
  })
)(AdvantageCreateMutation)