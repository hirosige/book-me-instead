import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import './Country.css'
import CountryTableRow from './CountryTableRow';
import CountryEditableTableRow from './CountryEditableTableRow';
import WithProxy from '../../hoc/WithProxy'

class Country extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditting: ""
    }
    this.clickEdit = this.clickEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete = async (id, event) => {
    try {
      const res = await this.props.deleteCountry({
        variables: {
          id,
        }
      });
      console.log(res)
    } catch(err) {
      console.log(err)
    }
  }

  checkEdit = (id, e) => {
    return this.state.isEditting === id
  }

  clickEdit = async (id, e) => {
    if (this.checkEdit(id)) {
      await this.setState({ isEditting: "" })
    } else {
      await this.setState({ isEditting: id })
    }
  }

  render() {
    const { allCountries } = this.props.getAllCountries

    return (
      <Layout>
        <div style={{ padding: "10px" }}>
          <form>
            <table className="table is-narrow is-hoverable">
              <thead>
                <tr>
                  <th><abbr title="Name">Name</abbr></th>
                  <th><abbr title="Code">Code</abbr></th>
                  <th><abbr title="Slug">Slug</abbr></th>
                  <th><abbr title="Areas">Areas</abbr></th>
                  <th><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                { allCountries && allCountries.map(country => (
                  <tr key={country.id}>
                    { this.checkEdit(country.id) ? (
                      <CountryEditableTableRow
                        country={country}
                        clickEdit={this.clickEdit}
                        handleDelete={this.handleDelete}
                      />
                    ) : (
                      <CountryTableRow
                        country={country}
                        clickEdit={this.clickEdit}
                        handleDelete={this.handleDelete}
                      />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
          <Link className="button is-warning is-small" to="/countries/new" style={{
            marginTop: "10px",
            borderRadius: 0,
          }}>
            ADD COUNTRY
          </Link>
        </div>
      </Layout>
    )
  }
}

const GET_ALL_COUNTRIES = gql`
  query {
    allCountries {
      id
      name
      code
      slug
      areas {
        id
        name
        code
        slug
      }
    }
  }
`

const DELETE_COUNTRY = gql`
  mutation DeleteCountry($id: ID!) {
    deleteCountry(id: $id) {
      id
    }
  }
`

const PageWithQuery = compose(
  graphql(GET_ALL_COUNTRIES, {name: 'getAllCountries'}),
  graphql(DELETE_COUNTRY, {name: 'deleteCountry'})
)(Country)
export default WithProxy(PageWithQuery)