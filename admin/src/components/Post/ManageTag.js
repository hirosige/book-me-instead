import React from 'react'
import { compose } from 'recompose'
import { Mutation, graphql } from "react-apollo";
import {
  CREATE_TAG,
  ADD_TO_POST_TAGS,
} from '../../queries/Tag'

class ManageTag extends React.Component {
  state = {
    isOpen: false,
    tag: {
      name: "",
      color: "",
    },
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  initializeState = () => {
    this.setState({
      isOpen: false,
      tag: {
        name: "",
        color: "",
      },
    })
  }

  handleChange = e => {
    this.setState({
      tag: {
        ...this.state.tag,
        [e.target.name]: e.target.value
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        {this.state.isOpen ? (
          <Mutation mutation={CREATE_TAG}>
            {(mutate, { data, loading, error }) => (
              <React.Fragment>
                <form onSubmit={e => {
                  e.preventDefault();

                  mutate({
                    variables: {
                      ...this.state.tag,
                    }
                  }).then(res => {
                    this.props.addToPostTags({
                      variables: {
                        tagsTagId: res.data.createTag.id,
                        postsPostId: this.props.post.id
                      }
                    }).then(result => {
                      console.log(result)
                      this.initializeState()
                    }).catch(e => {
                      console.log(e)
                    })
                  })
                }}>
                  {error && (
                    <div>{error.message}</div>
                  )}
                  <div className="field has-addons" style={{ marginBottom: 0 }}>
                    <div className="control">
                      <div className="button is-static is-small">
                        Tag Name
                      </div>
                    </div>
                    <div className="control">
                      <input
                        name="name"
                        sytle={{ width: "50px" }}
                        className="input is-small"
                        type="text"
                        placeholder="Tag Name"
                        value={this.state.tag.name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="field has-addons" style={{ marginBottom: 0, marginTop: 0 }}>
                    <div className="control">
                      <div className="button is-static is-small">
                        Color
                      </div>
                    </div>
                    <p className="control">
                      <input
                        name="color"
                        className="input is-small"
                        type="text"
                        placeholder="Color"
                        value={this.state.tag.color}
                        onChange={this.handleChange}
                      />
                    </p>
                  </div>
                  <div className="field has-addons">
                    <div className="control">
                      <button className="button is-primary is-small">
                        SUBMIT
                      </button>
                    </div>
                    <div className="control">
                      <div className="button is-small" onClick={this.toggleOpen}>
                        CANCEL
                      </div>
                    </div>
                  </div>
                </form>
              </React.Fragment>
            )}
          </Mutation>
        ) : (
          <button
            className="button is-small is-primary"
            onClick={this.toggleOpen}
          >
            Manage Tags
          </button>
        )}
      </React.Fragment>
    )
  }
}

export default compose(
  graphql(ADD_TO_POST_TAGS, { name: "addToPostTags" }),
)(ManageTag)