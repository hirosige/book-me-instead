import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import './Country.css'
import CountryTableRow from './CountryTableRow';
import CountryEditableTableRow from './CountryEditableTableRow';
import WithProxy from '../../hoc/WithProxy'
import ContentLoader from "react-content-loader"

class Country extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditting: "",
      country: {
        name: "",
        code: "",
        slug: ""
      },
    }
    this.clickEdit = this.clickEdit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
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

  updateCountryState = (params) => {
    this.setState({ country: {
      ...this.state.country,
      ...params
    }})
  }

  handleEdit = async (event) => {
    event.preventDefault();

    console.log(this.state.country)

    const { isEditting } = this.state

    const {
      name,
      code,
      slug
    } = this.state.country

    try {
      await this.props.updateCountry({
        variables: {
          id: isEditting,
          name,
          code,
          slug
        }
      });
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.setState({
        isEditting: "",
      })
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    const { allCountries } = this.props.getAllCountries

    if (this.props.getAllCountries && this.props.getAllCountries.loading) {
      return (
        <Layout>
          <span className="icon" style={{
            height: '30px',
            width: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            background: '#007BFF',
            margin: "30px",
          }}>
            <i className="fas fa-sync fa-spin" style={{
              fontSize: '1rem',
              color: '#ffffff'
            }}></i>
          </span>
          <ContentLoader
            height={300}
            width={500}
            speed={1}
            primaryColor="#1700ff"
            secondaryColor="#ecebeb"
            {...this.props}
          >
            <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" />
            <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
            <rect x="0" y="80" rx="3" ry="3" width="350" height="6.4" />
            <rect x="0" y="100" rx="3" ry="3" width="380" height="6.4" />
            <rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" />
            <circle cx="30" cy="30" r="30" />
          </ContentLoader>
        </Layout>
      )
    }

    return (
      <Layout {...this.props}>
        <div style={{ padding: "10px" }}>
          <form onSubmit={this.handleEdit}>
            <table className="table is-narrow is-hoverable" style={{ tableLayout: "fixed" }}>
              <thead>
                <tr>
                  <th style={{ width: "200px" }}><abbr title="Name">Name</abbr></th>
                  <th style={{ width: "200px" }}><abbr title="Code">Code</abbr></th>
                  <th style={{ width: "200px" }}><abbr title="Slug">Slug</abbr></th>
                  <th style={{ width: "400px" }}><abbr title="Areas">Areas</abbr></th>
                  <th style={{ width: "150px" }}><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                { allCountries && allCountries.map(country => (
                  <tr key={country.id}>
                    { this.checkEdit(country.id) ? (
                      <CountryEditableTableRow
                        country={country}
                        clickEdit={this.clickEdit}
                        updateCountryState={this.updateCountryState}
                      />
                    ) : (
                      <CountryTableRow
                        country={country}
                        clickEdit={this.clickEdit}
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

const UPDATE_COUNTRY = gql`
  mutation UpdateCountry(
    $id: ID!
    $name: String!,
    $code: String!,
    $slug: String!
  ) {
    updateCountry(
      id: $id,
      name: $name,
      code: $code,
      slug: $slug
    ) {
      id
    }
  }
`

const PageWithQuery = compose(
  graphql(GET_ALL_COUNTRIES, {name: 'getAllCountries'}),
  graphql(UPDATE_COUNTRY, {name: 'updateCountry'}),
)(Country)

export default WithProxy(PageWithQuery)