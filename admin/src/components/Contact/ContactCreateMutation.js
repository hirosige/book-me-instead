import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import {
  CREATE_CONTACT,
  GET_CONTACTS,
} from '../../queries/Contact'

import { Mutation } from "react-apollo";
import { Formik } from 'formik'
import { produce } from 'immer';
import { validateCreate } from '../../validators/Contact'
import ContactMutationForm from './ContactMutationForm';

const ContactCreateMutation = props => {
  return (
    <React.Fragment>
      <Mutation mutation={CREATE_CONTACT}>
        {(mutate, {loading, data, error}) => (
          <React.Fragment>
            <Formik
              initialValues={{
                name: '',
                email: '',
                tel: '',
                title: '',
                description: '',
                reference: '',
              }}
              validate={values => validateCreate(values)}
              onSubmit={ async ({
                name,
                email,
                tel,
                title,
                description,
                reference,
              }, { resetForm, setSubmitting }) => {
                await mutate({
                  variables: {
                    name,
                    email,
                    tel,
                    title,
                    description,
                    reference,
                    isReplied: false,
                  },
                  update: (store, { data }) => {
                    if (!data || !data.createContact) {
                      return;
                    }

                    const contacts = store.readQuery({
                      query: GET_CONTACTS,
                      variables: props.indexVariables
                    })

                    store.writeQuery({
                      data: produce(contacts, ds => {
                        ds.allContacts.unshift(
                          data.createContact
                        )
                      }),
                      query: GET_CONTACTS,
                      variables: props.indexVariables,
                    })
                  },
                })
                .then(_ => {
                  setSubmitting(false)
                  resetForm()
                  props.notifyUser({ type: "is-success", message: "Contact is successfully created" })
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
                  <ContactMutationForm
                    title="CREATE CONTACT"
                    message="Contact is Successfully created."
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
    size: '',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "80%"
    }
  })
)(ContactCreateMutation)