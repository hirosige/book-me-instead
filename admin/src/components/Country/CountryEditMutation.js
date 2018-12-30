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
              validate={values => {
                let errors = {};
                if (!values.name) errors.name = 'Name is equired';
                if (!values.code) errors.code = 'Code is equired';
                if (!values.slug) errors.slug = 'Slug is equired';

                return errors;
              }}
              onSubmit={ async (formProps, { resetForm }) => {
                await mutate({
                  variables: {
                    ...formProps
                  },
                  update: (store, { data }) => {
                    console.log('data', data)
                    console.log('variables', props.indexVariables)
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

                resetForm()
                props.notifyUser({ type: "is-success", message: "Country is successfully updated" })
                props.switchModal()
              }}
            >
              {({ errors, touched }) => (
                <CountryMutationForm
                  title="UPDATE COUNTRY"
                  message="Country is Successfully updated."
                  errors={errors}
                  touched={touched}
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