import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import {
  UPDATE_PROFILE,
  GET_USERS,
} from '../../queries/User'

import { Mutation } from "react-apollo";
import { Formik } from 'formik'
import { produce } from 'immer';
import ProfileMutationForm from './ProfileMutationForm';
import { validateUpdate } from '../../validators/Profile'

const ProfileEditMutation = props => {
  return (
    <React.Fragment>
      <Mutation mutation={UPDATE_PROFILE}>
        {(mutate, {loading, data, error}) => (
          <React.Fragment>
            <Formik
              initialValues={{
                firstName: props.user.profile.firstName,
                lastName: props.user.profile.lastName,
                passportNo: props.user.profile.passportNo,
                tel: props.user.profile.tel,
                address: props.user.profile.address,
                subscriptionEmail: props.user.profile.subscriptionEmail,
              }}
              validate={values => validateUpdate(values)}
              onSubmit={ async ({
                firstName,
                lastName,
                passportNo,
                tel,
                address,
                subscriptionEmail,
              }, { resetForm, setSubmitting }) => {
                await mutate({
                  variables: {
                    id: props.user.profile.id,
                    firstName,
                    lastName,
                    passportNo,
                    tel,
                    address,
                    subscriptionEmail,
                  },
                  update: (store, { data }) => {
                    if (!data || !data.updateProfile) {
                      return;
                    }

                    const users = store.readQuery({
                      query: GET_USERS,
                      variables: props.indexVariables
                    })

                    store.writeQuery({
                      data: produce(users, ds => {
                        ds.allUsers[ds.allUsers.findIndex(user => user.id === props.user.id)]
                          .profile = data.updateProfile
                      }),
                      query: GET_USERS,
                      variables: props.indexVariables,
                    })
                  },
                })
                .then(_ => {
                  setSubmitting(false)
                  resetForm()
                  props.notifyUser({ type: "is-success", message: "Country is successfully updated" })
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
                  <ProfileMutationForm
                    title="UPDATE PROFILE"
                    message="Profile is Successfully updated."
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
    button: 'UPDATE PROFILE',
    size: 'is-small',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "80%"
    }
  })
)(ProfileEditMutation)