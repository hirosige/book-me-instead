import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Layout from '../Layout';
import './Country.css'
import CountryTableRow from './CountryTableRow';
import CountryEditableTableRow from './CountryEditableTableRow';
import WithProxy from '../../hoc/WithProxy'
import ContentLoader from "react-content-loader"
import CreateCountryModal from './CreateCountryModal';
import {
  QUERY_CREATED,
  QUERY_UPDATED,
  QUERY_DELETED
} from '../../constants/query'

class Country extends Component {
  constructor(props) {
    super(props)

    this.props.data = {
      variables: {
        first: 10,
        skip: 0
      }
    }

    this.state = {
      isEditting: "",
      isCreating: false,
      isActive: "",
      currentPage: 0,
      country: {
        name: "",
        code: "",
        slug: ""
      },
    }
    this.clickEdit = this.clickEdit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    this.props.data.variables({
      first: 10,
      skip: 0
    })

    this.props.getAllCountries.subscribeToMore({
      document: COUNTRIES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        let result = { allPosts: prev.allCountries };
        const { mutation } = subscriptionData.data.Country

        switch(mutation) {
          case QUERY_CREATED:
            const newCountries = [
              ...prev.allCountries,
              subscriptionData.data.Country.node,
            ]

            result = { allCountries: newCountries };
            break
          case QUERY_UPDATED:
            const updatedId = subscriptionData.data.Country.node.id
            const editCountries = prev.allCountries.map(country => {
              if (country.id === updatedId) {
                return subscriptionData.data.Country.node
              }
              return country
            })
            result = { allCountries: editCountries }
            break
          case QUERY_DELETED:
            const deletedId = subscriptionData.data.Country.previousValues.id
            const deletedCountries = prev.allCountries.filter(n => n.id !== deletedId)

            result = { allCountries: deletedCountries };
            break
          default:
            break
      }

        console.log('result', result)
        console.log('prev', prev);
        console.log('sub', subscriptionData.data);

        return result;
      },
    });
}

  checkEdit = (id, e) => {
    return this.state.isEditting === id
  }

  clickAddCountry = () => {
    this.switchModal()
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

  switchModal = () => {
    if (this.state.isActive === "") {
      this.setState({ isActive: "is-active" })
    } else {
      this.setState({ isActive: "" })
    }
  }

  handleEdit = async (event) => {
    event.preventDefault();

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

  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 })
  }

  render() {
    this.props.data.variables({
      first: 10,
      skip: 0
    })
    const { allCountries } = this.props.getAllCountries

    if (this.props.getAllCountries && this.props.getAllCountries.loading) {
      return (
        <Layout>
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
          <CreateCountryModal
            isActive={this.state.isActive}
            switchModal={this.switchModal} />
          <button
            className="button is-small is-warning"
            onClick={this.clickAddCountry}
            style={{
              marginBottom: "10px"
            }}
          >
            ADD COUNTRY
          </button>
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
          <button
            className="button is-primary is-small"
            onClick={this.nextPage}>Next Page</button>
        </div>
      </Layout>
    )
  }
}

const GET_ALL_COUNTRIES = gql`
  query paginatedCountries(
    $first: Int!
    $skip: Int!,
  ) {
    allCountries(
      first: $first
      skip: $skip
    ) {
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

const COUNTRIES_SUBSCRIPTION = gql`
  subscription {
    Country(
      filter: {
        mutation_in: [CREATED, UPDATED, DELETED]
      }
    ) {
      mutation # 実行されたmutationの種類を出力
      node { # 変化後のデータを出力
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
      updatedFields # UPDATEされたフィールドを出力
      previousValues { # 変化前のデータを出力
        id
        name
        code
        slug
      }
    }
  }
`;

const PageWithQuery = compose(
  graphql(GET_ALL_COUNTRIES, {name: 'getAllCountries'}),
  graphql(UPDATE_COUNTRY, {name: 'updateCountry'}),
)(Country)

export default WithProxy(PageWithQuery)