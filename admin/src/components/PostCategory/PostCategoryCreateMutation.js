import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import {
  CREATE_POST_CATEGORY,
  GET_POST_CATEGORIES,
} from '../../queries/PostCategory'

import { Mutation } from "react-apollo";
import { Formik } from 'formik'
import { produce } from 'immer';
import { validateCreate } from '../../validators/PostCategory'
import PostCategoryMutationForm from './PostCategoryMutationForm';

const PostCategoryCreateMutation = props => {
  return (
    <React.Fragment>
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
                    isRoot: true,
                  },
                  update: (store, { data }) => {
                    if (!data || !data.createPostCategory) {
                      return;
                    }

                    const postCategories = store.readQuery({
                      query: GET_POST_CATEGORIES,
                      variables: props.indexVariables
                    })

                    store.writeQuery({
                      data: produce(postCategories, ds => {
                        ds.allPostCategories.unshift(
                          data.createPostCategory
                        )
                      }),
                      query: GET_POST_CATEGORIES,
                      variables: props.indexVariables,
                    })
                  },
                })
                .then(_ => {
                  setSubmitting(false)
                  resetForm()
                  props.notifyUser({ type: "is-success", message: "Root Category is successfully created" })
                  props.switchModal()
                })
                .catch(error => {
                  setSubmitting(false)
                  props.notifyUser({ type: "is-danger", message: error.message })
                })
              }}
            >
              {({
                errors,
                touched,
                isSubmitting
              }) => (
                <React.Fragment>
                  <PostCategoryMutationForm
                    title="CREATE POST CATEGORY"
                    message="Root Category is Successfully created."
                    errors={errors}
                    graphqlErrors={error && error.graphQLErrors[0] && JSON.parse(error.graphQLErrors[0].message)}
                    touched={touched}
                    isSubmitting={isSubmitting}
                    switchModal={props.switchModal}
                  />
                </React.Fragment>
              )}
            </Formik>
          </React.Fragment>
        )}
      </Mutation>
    </React.Fragment>
  )
}

export default compose(
  withModal({
    button: 'CREATE ROOT CATEGORY',
    size: '',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "80%"
    }
  })
)(PostCategoryCreateMutation)