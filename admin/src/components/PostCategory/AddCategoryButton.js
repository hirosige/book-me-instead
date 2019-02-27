import React from 'react'
import { compose } from 'recompose'
import { Mutation, graphql } from "react-apollo";
import {
  CREATE_POST_CATEGORY,
  GET_POST_CATEGORIES,
  ADD_TO_CHILDREN
} from '../../queries/PostCategory'

import { Formik } from 'formik'
import { produce } from 'immer';
import { validateCreate } from '../../validators/PostCategory'
import PostCategoryChildMutationForm from './PostCategoryChildMutationForm';

class AddCategoryButton extends React.PureComponent {
  state = {
    isOpen: false
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    return (
      <React.Fragment>
        {this.state.isOpen ? (
          <Mutation mutation={CREATE_POST_CATEGORY}>
            {(mutate, {loading, data, error}) => (
              <React.Fragment>
                <Formik
                  initialValues={{
                    name: '',
                  }}
                  validate={values => validateCreate(values)}
                  onSubmit={ async ({
                    name,
                  }, { resetForm, setSubmitting }) => {
                    await mutate({
                      variables: {
                        name,
                        isRoot: false,
                      },
                    })
                    .then(res => {
                      const { createPostCategory } = res.data

                      this.props.addToChildren({
                        variables: {
                          children1PostCategoryId: this.props.postCategory.id,
                          children2PostCategoryId: createPostCategory.id
                        },
                      }).then(_ => {
                        setSubmitting(false)
                        resetForm()
                        this.props.notifyUser({ type: "is-success", message: "Post Category is successfully created" })
                        this.toggleOpen()
                      }).catch(error => {
                        setSubmitting(false)
                        this.props.notifyUser({ type: "is-danger", message: error.message })
                      })
                    })
                    .catch(error => {
                      setSubmitting(false)
                      this.props.notifyUser({ type: "is-danger", message: error.message })
                    })
                  }}
                >
                  {({
                    errors,
                    touched,
                    isSubmitting
                  }) => (
                    <React.Fragment>
                      <PostCategoryChildMutationForm
                        title="CREATE POST CATEGORY"
                        message="Post Category is Successfully created."
                        errors={errors}
                        graphqlErrors={error && error.graphQLErrors[0] && JSON.parse(error.graphQLErrors[0].message)}
                        touched={touched}
                        isSubmitting={isSubmitting}
                        switchModal={this.props.switchModal}
                      />
                    </React.Fragment>
                  )}
                </Formik>
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
