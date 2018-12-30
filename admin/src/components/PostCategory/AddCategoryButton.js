import React from 'react'
import { compose } from 'recompose'
import { Mutation, graphql } from "react-apollo";
import {
  CREATE_POST_CATEGORY,
  ADD_TO_CHILDREN,
} from '../../queries/PostCategory'

class AddCategoryButton extends React.Component {
  state = {
    isOpen: false,
    category: {
      name: "",
      isRoot: false
    },
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  initializeState = () => {
    this.setState({
      isOpen: false,
      category: {
        name: "",
        isRoot: false
      },
    })
  }

  handleChange = e => {
    this.setState({
      category: {
        ...this.state.category,
        [e.target.name]: e.target.value
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        {this.state.isOpen ? (
          <Mutation mutation={CREATE_POST_CATEGORY}>
            {(mutate, { data, loading, error }) => (
              <React.Fragment>
                <form onSubmit={e => {
                  e.preventDefault();

                  mutate({
                    variables: {
                      ...this.state.category,
                    }
                  }).then(res => {

                    this.props.addToChildren({
                      variables: {
                        children1PostCategoryId: this.props.category.id,
                        children2PostCategoryId: res.data.createPostCategory.id
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
                        Category Name
                      </div>
                    </div>
                    <div className="control">
                      <input
                        name="name"
                        sytle={{ width: "50px" }}
                        className="input is-small"
                        type="text"
                        placeholder="Category Name"
                        value={this.state.category.name}
                        onChange={this.handleChange}
                      />
                    </div>
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
            この配下にカテゴリを追加
          </button>
        )}
      </React.Fragment>
    )
  }
}

export default compose(
  graphql(ADD_TO_CHILDREN, { name: "addToChildren" }),
)(AddCategoryButton)