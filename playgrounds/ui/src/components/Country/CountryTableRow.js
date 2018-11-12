import React, { Component } from 'react'

class CountryTableRow extends Component  {
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
            <p className="control">
              <div
                className="button is-small is-primary"
                onClick={this.props.clickEdit.bind(this, country.id)}
                style={{ borderRadius: 0 }}>
                <span>EDIT</span>
              </div>
            </p>
            <p className="control">
              <div
                className="button is-small is-danger"
                onClick={this.props.handleDelete.bind(this, country.id)}
                style={{ borderRadius: 0 }}>
                <span>DELETE</span>
              </div>
            </p>
          </div>
        </td>
      </React.Fragment>
    )
  }
}

export default CountryTableRow