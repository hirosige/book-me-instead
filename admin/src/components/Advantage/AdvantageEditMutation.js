import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import {
  UPDATE_ADVANTAGE,
  GET_ADVANTAGES,
} from '../../queries/Advantage'

import { Mutation } from "react-apollo";
import { Formik } from 'formik'
import { produce } from 'immer';
import { validateCreate } from '../../validators/Advantage'
import AdvantageMutationForm from './AdvantageMutationForm';

const AdvantageCreateMutation = props => {
  return (
    <React.Fragment>
      <Mutation mutation={UPDATE_ADVANTAGE}>
        {(mutate, {loading, data, error}) => (
          <React.Fragment>
            <Formik
              initialValues={{
                name: props.advantage.name,
                iconName: props.advantage.iconName,
              }}
              validate={values => validateCreate(values)}
              onSubmit={ async ({
                name,
                iconName
              }, { resetForm, setSubmitting }) => {
                await mutate({
                  variables: {
                    id: props.advantage.id,
                    name,
                    iconName
                  },
                  update: (store, { data }) => {
                    if (!data || !data.updateAdvantage) {
                      return;
                    }

                    const advantages = store.readQuery({
                      query: GET_ADVANTAGES,
                      variables: props.indexVariables
                    })

                    store.writeQuery({
                      data: produce(advantages, ds => {
                        ds.allAdvantages[ds.allAdvantages.findIndex(advantage => advantage.id === data.updateAdvantage.id)] =
                          data.updateAdvantage
                      }),
                      query: GET_ADVANTAGES,
                      variables: props.indexVariables,
                    })
                  },
                })
                .then(_ => {
                  setSubmitting(false)
                  resetForm()
                  props.notifyUser({ type: "is-success", message: "Advantage is successfully updated" })
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
                  <AdvantageMutationForm
                    title="UPDATE ADVANTAGE"
                    message="Advantage is Successfully updated."
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
    button: 'EDIT',
    size: 'is-small',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "80%"
    }
  })
)(AdvantageCreateMutation)