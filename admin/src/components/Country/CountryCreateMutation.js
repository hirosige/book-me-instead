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

const CountryCreateMutation = props => {
  return (
    <React.Fragment>
      <Mutation mutation={CREATE_COUNTRY}>
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <Formik
              initialValues={{
                name: '',
                code: '',
                slug: '',
              }}
              validate={values => {
                let errors = {};
                if (!values.name) errors.name = 'Name is equired';
                if (!values.code) errors.code = 'Code is equired';
                if (!values.slug) errors.slug = 'Slug is equired';

                return errors;
              }}
              onSubmit={ async ({ name, code, slug }, { resetForm }) => {
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

                resetForm()
                props.notifyUser({ type: "is-success", message: "Country is successfully created" })
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
    button: 'CREATE COUNTRY',
    size: '',
    color: 'is-primary',
    type: 'card',
  })
)(CountryCreateMutation)