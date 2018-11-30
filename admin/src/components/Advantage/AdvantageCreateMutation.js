import React from 'react'
import { Mutation } from "react-apollo";
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame';
import { CREATE_ADVANTAGE } from '../../queries/Advantage'
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'
import Uploader from '../Upload/Uploader'

class AdvantageCreateMutation extends React.Component {
  state = {
    name: "",
    icon: "",
    file: {
      name: "",
      cdnUrl: "",
      isImage: false,
      isStored: false,
      mimeType: "",
      uuid: "",
      size: 0,
    }
  }

  initializeState = () => {
    this.setState({
      file: {
        name: "",
        cdnUrl: "",
        isImage: false,
        isStored: false,
        mimeType: "",
        uuid: "",
        size: 0,
      }
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
      file: {
        name: fileInfo.name,
        cdnUrl: fileInfo.cdnUrl,
        isImage: fileInfo.isImage,
        isStored: fileInfo.isStored,
        mimeType: fileInfo.mimeType,
        uuid: fileInfo.uuid,
        size: fileInfo.size,
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        <Mutation
          mutation={CREATE_ADVANTAGE}
        >
          {(createAdvantage, { data, loading, error }) => (
            <React.Fragment>
              <form onSubmit={e => {
                e.preventDefault();

                createAdvantage({
                  variables: {
                    name: this.state.name,
                    iconName: this.state.file.name,
                    iconCdnUrl: this.state.file.cdnUrl,
                    iconIsImage: this.state.file.isImage,
                    iconIsStored: this.state.file.isStored,
                    iconMimeType: this.state.file.mimeType,
                    iconUuid: this.state.file.uuid,
                    iconSize: this.state.file.size,
                  }}).then(() => {
                    this.initializeState()
                    this.props.makeCompleted()
                  });

                }}
              >
                <header className="modal-card-head no-br bk-primary">
                  <p className="modal-card-title txt-white">CREATE ADVANTAGE</p>
                  <div className="delete" aria-label="close" onClick={this.props.switchModal}></div>
                </header>
                {error && (
                  <Danger message={error.message} />
                )}
                {this.props.isCompleted && (
                  <Success
                    message="Country is Successfully created."
                    closeCompleted={this.props.closeCompleted}
                  />
                )}
                <section className="modal-card-body txt-gray">
                  <HorizontalInputBoxFrame
                    columnName="Name"
                    notice="Do not enter the first zero"
                  >
                    <input
                      name="name"
                      className="input"
                      type="text"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                  <HorizontalInputBoxFrame
                    columnName="Icon"
                    notice="Do not enter the first zero"
                  >
                    <Uploader
                      id='file'
                      name='file'
                      onChange={(file) => {
                        console.log('File changed: ', file)

                        if (file) {
                          file.progress(info => console.log('File progress: ', info.progress))
                          file.done(info => console.log('File uploaded: ', info))
                        }
                      }}
                      onUploadComplete={info => this.handleChangePhoto(info)}
                    />
                  </HorizontalInputBoxFrame>
                </section>
                <footer className="modal-card-foot no-br">
                  <button className="button is-success no-br" type="submit no-br">SUBMIT</button>
                  <div className="button no-br" onClick={this.props.switchModal}>CANCEL</div>
                </footer>
              </form>
            </React.Fragment>
          )}
        </Mutation>
      </React.Fragment>
    )
  }
}

export default compose(
  withModal('CREATE ADVANTAGE')
)(AdvantageCreateMutation)