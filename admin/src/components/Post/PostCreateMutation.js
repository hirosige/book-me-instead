import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import { CREATE_POST } from '../../queries/Post'
import PostMutationForm from './PostMutationForm';

class PostCreateMutation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      mdContents: "",
      categoryId: "",
      authorId: props.me.id,
    }
  }

  initializeState = () => {
    this.setState({
      title: "",
      mdContents: "",
      authorId: this.props.me.id,
      categoryId: "",
      heroName: "",
      heroCdnUrl: "",
      heroIsImage: false,
      heroIsStored: false,
      heroMimeType: "",
      heroUuid: "",
      heroSize: 0,
      photoGrpName: "",
      photoGrpCdnUrl: "",
      photoGrpIsImage: false,
      photoGrpIsStored: false,
      photoGrpCount: 0,
      photoGrpUuid: "",
      photoGrpSize: 0,
    })
  }

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
    return (
      <React.Fragment>
        <PostMutationForm
          mutation={CREATE_POST}
          post={this.state}
          handleChange={this.handleChange}
          handleChangeHero={this.handleChangeHero}
          handleChangePhotos={this.handleChangePhotos}
          setMdContents={this.setMdContents}
          initializeState={this.initializeState}
          title="CREATE POST"
          heroValue={this.state.heroName}
          message="Post is Successfully created."
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'CREATE POST',
    size: '',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "80%"
    }
  })
)(PostCreateMutation)