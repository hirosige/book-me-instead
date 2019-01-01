import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import {
  GET_COUNTRIES,
  UPDATE_COUNTRY,
} from '../../queries/Country'
import { Mutation } from "react-apollo";
import { Formik } from 'formik'
import { produce } from 'immer';
import CountryMutationForm from './CountryMutationForm';
import { validateUpdate } from '../../validators/Country'

const CountryEditMutation = props => {
  return (
    <React.Fragment>
      <Mutation mutation={UPDATE_COUNTRY}>
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <Formik
              initialValues={{
                ...props.editItem
              }}
              validate={values => validateUpdate(values)}
              onSubmit={ async (formProps, { resetForm, setSubmitting }) => {
                await mutate({
                  variables: {
                    ...formProps
                  },
                  update: (store, { data }) => {
                    if (!data || !data.updateCountry) {
                      return;
                    }

                    const countries = store.readQuery({
                      query: GET_COUNTRIES,
                      variables: props.indexVariables
                    })

                    store.writeQuery({
                      data: produce(countries, ds => {
                        ds.allCountries[ds.allCountries.findIndex(country => country.id === data.updateCountry.id)] =
                          data.updateCountry
                      }),
                      query: GET_COUNTRIES,
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
                .catch(_ => setSubmitting(false))
              }}
            >
              {({
                errors,
                touched,
                isSubmitting,
              }) => (
                <CountryMutationForm
                  title="UPDATE COUNTRY"
                  message="Country is Successfully updated."
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                  switchModal={props.switchModal}
                />
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
    button: 'EDIT',
    size: 'is-small',
    color: 'is-primary',
    type: 'card',
  })
)(CountryEditMutation)