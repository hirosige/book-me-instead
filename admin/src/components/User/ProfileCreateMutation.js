import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import {
  CREATE_PROFILE,
  GET_USERS,
} from '../../queries/User'

import { Mutation } from "react-apollo";
import { Formik } from 'formik'
import { produce } from 'immer';
import ProfileMutationForm from './ProfileMutationForm';
import { validateCreate } from '../../validators/Profile'

const ProfileCreateMutation = props => {
  return (
    <React.Fragment>
      <Mutation mutation={CREATE_PROFILE}>
        {(mutate, {loading, data, error}) => (
          <React.Fragment>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                passportNo: '',
                tel: '',
                address: '',
                subscriptionEmail: '',
              }}
              validate={values => validateCreate(values)}
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
                    firstName,
                    lastName,
                    passportNo,
                    tel,
                    address,
                    subscriptionEmail,
                    userId: props.user.id
                  },
                  update: (store, { data }) => {
                    if (!data || !data.createProfile) {
                      return;
                    }

                    const users = store.readQuery({
                      query: GET_USERS,
                      variables: props.indexVariables
                    })

                    store.writeQuery({
                      data: produce(users, ds => {
                        ds.allUsers[ds.allUsers.findIndex(user => user.id === props.user.id)]
                          .profile = data.createProfile
                      }),
                      query: GET_USERS,
                      variables: props.indexVariables,
                    })
                  },
                })
                .then(_ => {
                  setSubmitting(false)
                  resetForm()
                  props.notifyUser({ type: "is-success", message: "Country is successfully created" })
                  props.switchModal()
                })
                .catch(_ => setSubmitting(false))
              }}
            >
              {({
                errors,
                touched,
                isSubmitting
              }) => (
                <React.Fragment>
                  <ProfileMutationForm
                    title="CREATE PROFILE"
                    message="Profile is Successfully created."
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
    button: 'CREATE PROFILE',
    size: 'is-small',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "80%"
    }
  })
)(ProfileCreateMutation)