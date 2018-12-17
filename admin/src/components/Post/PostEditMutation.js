import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { UPDATE_POST } from '../../queries/Post'
import PostMutationForm from './PostMutationForm'

class PostEditMutation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.editItem,
      authorId: props.me.id,
      heroName: props.editItem.hero.name,
      heroCdnUrl: props.editItem.hero.cdnUrl,
      heroIsImage: props.editItem.hero.isImage,
      heroIsStored: props.editItem.hero.isStored,
      heroMimeType: props.editItem.hero.mimeType,
      heroUuid: props.editItem.hero.uuid,
      heroSize: props.editItem.hero.size,
      photoGrpName: props.editItem.photos.name,
      photoGrpCdnUrl: props.editItem.photos.cdnUrl,
      photoGrpIsImage: props.editItem.photos.isImage,
      photoGrpIsStored: props.editItem.photos.isStored,
      photoGrpCount: props.editItem.photos.count,
      photoGrpUuid: props.editItem.photos.uuid,
      photoGrpSize: props.editItem.photos.size,
    }
  }

  initializeState = () => { /* Do nothing for edit */ }

  setMdContents = mdContents => {
    this.setState({
      mdContents
    })
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  handleChangeHero = fileInfo => {
    this.setState({
      ...this.state,
      heroName: fileInfo.name,
      heroCdnUrl: fileInfo.cdnUrl,
      heroIsImage: fileInfo.isImage,
      heroIsStored: fileInfo.isStored,
      heroMimeType: fileInfo.mimeType,
      heroUuid: fileInfo.uuid,
      heroSize: fileInfo.size,
    })
  }

  handleChangePhotos = filesInfo => {
    this.setState({
      ...this.state,
      photoGrpName: filesInfo.name,
      photoGrpCdnUrl: filesInfo.cdnUrl,
      photoGrpIsImage: filesInfo.isImage,
      photoGrpIsStored: filesInfo.isStored,
      photoGrpCount: filesInfo.count,
      photoGrpUuid: filesInfo.uuid,
      photoGrpSize: filesInfo.size,
    })
  }

  render () {
    const {
      hero,
      photos,
    } = this.state

    return (
      <React.Fragment>
        <PostMutationForm
          mutation={UPDATE_POST}
          post={this.state}
          handleChange={this.handleChange}
          handleChangeHero={this.handleChangeHero}
          handleChangePhotos={this.handleChangePhotos}
          setMdContents={this.setMdContents}
          initializeState={this.initializeState}
          title="EDIT POST"
          message="Post is Successfully updated."
          heroValue={hero ? hero.cdnUrl : ''}
          photosValue={photos ? photos.cdnUrl : ''}
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
    style: {
      width: "80%"
    },
  })
)(PostEditMutation)