import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import {
  CREATE_COUNTRY,
  GET_COUNTRIES,
} from '../../queries/Country'

import { Mutation } from "react-apollo";
import { Formik } from 'formik'
import { produce } from 'immer';
import CountryMutationForm from './CountryMutationForm';
import { validateCreate } from '../../validators/Country'

const CountryCreateMutation = props => {
  return (
    <React.Fragment>
      <Mutation mutation={CREATE_COUNTRY}>
        {(mutate, {loading, data, error}) => (
          <React.Fragment>
            <Formik
              initialValues={{
                name: '',
                code: '',
                slug: '',
              }}
              validate={values => validateCreate(values)}
              onSubmit={ async ({ name, code, slug }, { resetForm, setSubmitting }) => {
                await mutate({
                  variables: {
                    name,
                    code,
                    slug
                  },
                  update: (store, { data }) => {
                    if (!data || !data.createCountry) {
                      return;
                    }

                    const countries = store.readQuery({
                      query: GET_COUNTRIES,
                      variables: props.indexVariables
                    })

                    store.writeQuery({
                      data: produce(countries, ds => {
                        ds.allCountries.unshift(
                          data.createCountry
                        )
                      }),
                      query: GET_COUNTRIES,
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
                  <CountryMutationForm
                    title="CREATE COUNTRY"
                    message="Country is Successfully updated."
                    errors={errors}
                    graphqlErrors={error && JSON.parse(error.graphQLErrors[0].message)}
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
    button: 'CREATE COUNTRY',
    size: '',
    color: 'is-primary',
    type: 'card',
  })
)(CountryCreateMutation)