import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './Country.css'

class CountryTableRow extends Component  {
  handleDelete = async (id, e) => {
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

  render () {
    const { country } = this.props

    return (
      <React.Fragment>
        <td>{country.name}</td>
        <td>{country.code}</td>
        <td>{country.slug}</td>
        <td>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            { country.areas.map((area) => (
              <span
                className="tag is-danger"
                style={{ marginBottom: "10px" }}
                key={area.id}
              >{area.name}</span>
            ))}
          </div>
        </td>
        <td>
          <div className="field has-addons">
            <div className="control">
              <div
                className="button is-small is-primary"
                onClick={this.props.clickEdit.bind(this, country.id)}
                style={{ borderRadius: 0 }}>
                <span>EDIT</span>
              </div>
            </div>
            <div className="control">
              <div
                className="button is-small is-danger"
                onClick={this.handleDelete.bind(this, country.id)}
                style={{ borderRadius: 0 }}>
                <span>DELETE</span>
              </div>
            </div>
          </div>
        </td>
      </React.Fragment>
    )
  }
}

const DELETE_COUNTRY = gql`
  mutation DeleteCountry($id: ID!) {
    deleteCountry(id: $id) {
      id
    }
  }
`

const PageWithQuery = graphql(DELETE_COUNTRY, {name: 'deleteCountry'})(CountryTableRow)

export default PageWithQuery