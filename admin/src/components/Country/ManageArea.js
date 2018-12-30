import React from 'react'
import { Mutation } from 'react-apollo';
import { CREATE_AREA } from '../../queries/Area'
import { GET_COUNTRIES } from '../../queries/Country'
import { Formik } from 'formik'
import { produce } from 'immer';
import AreaMutationForm from './AreaMutationForm';

class ManageArea extends React.Component {
  state = {
    isOpen: false,
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    return (
      <React.Fragment>
        {this.state.isOpen ? (
          <Mutation mutation={CREATE_AREA}>
            {(mutate, { data, loading, error }) => (
              <div style={{ background: "rgb(237, 242, 247)", padding: 10 }}>
                <Formik
                  initialValues={{
                    name: '',
                    code: '',
                    slug: '',
                    countryId: this.props.country.id
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
                      optimisticResponse: {
                        createArea: {
                          __typename: 'Area',
                          id: '-1',
                          ...formProps,
                        }
                      },
                      update: (store, { data }) => {
                        if (!data || !data.createArea) {
                          return;
                        }

                        const countries = store.readQuery({
                          query: GET_COUNTRIES,
                          variables: this.props.indexVariables
                        })

                        store.writeQuery({
                          data: produce(countries, ds => {
                            ds.allCountries[ds.allCountries.findIndex(country => country.id === this.props.country.id)]
                              .areas
                              .push(data.createArea)
                          }),
                          query: GET_COUNTRIES,
                          variables: this.props.indexVariables,
                        })
                      },
                    })

                    resetForm()
                    this.props.notifyUser({ type: "is-success", message: "Area is successfully created" })
                    this.toggleOpen()
                  }}
                >
                  {({ errors, touched }) => (
                    <AreaMutationForm
                      errors={errors}
                      touched={touched}
                      toggleOpen={this.toggleOpen}
                    />
                  )}
                </Formik>
              </div>
            )}
          </Mutation>
        ) : (
          <button
            className="button is-small is-primary"
            onClick={this.toggleOpen}
          >
            Manage Areas
          </button>
        )}
      </React.Fragment>
    )
  }
}

export default ManageArea
