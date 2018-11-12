import React, { Component } from 'react'

class CountryEditableTableRow extends Component  {
  render () {
    const { country } = this.props

    return (
      <React.Fragment>
        <td>{country.name}:editting</td>
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
                className="button is-small is-warning"
                onClick={this.props.clickEdit.bind(this, country.id)}
                style={{ borderRadius: 0 }}>
                <span>CANCEL</span>
              </div>
            </p>
            <p className="control">
              <div
                className="button is-small is-info"
                onClick={this.props.handleDelete.bind(this, country.id)}
                style={{ borderRadius: 0 }}>
                <span>SUBMIT</span>
              </div>
            </p>
          </div>
        </td>
      </React.Fragment>
    )
  }
}

export default CountryEditableTableRow