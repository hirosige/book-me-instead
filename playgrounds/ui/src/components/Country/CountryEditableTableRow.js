import React, { Component } from 'react'

class CountryEditableTableRow extends Component  {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("child edit")
    console.log(event.target.value)
    this.props.updateCountryState({[event.target.name]: event.target.value})
  }

  render () {
    const { country } = this.props

    return (
      <React.Fragment>
        <td>
          <div className="field">
            <div className="control">
              <input
                className="input is-small"
                type="text"
                placeholder="Input Name"
                name="name"
                onChange={this.handleChange}
              />
            </div>
          </div>
        </td>
        <td>
          <div className="field">
            <div className="control">
              <input
                className="input is-small"
                type="text"
                placeholder="Input Code"
                name="code"
                onChange={this.handleChange}
              />
            </div>
          </div>
        </td>
        <td>
          <div className="field">
            <div className="control">
              <input
                className="input is-small"
                type="text"
                placeholder="Input Slug"
                name="slug"
                onChange={this.handleChange}
              />
            </div>
          </div>
        </td>
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
                className="button is-small is-warning"
                onClick={this.props.clickEdit.bind(this, country.id)}
                style={{ borderRadius: 0 }}>
                <span>CANCEL</span>
              </div>
            </div>
            <div className="control">
              <button
                className="button is-small is-info"
                type="submit"
                style={{ borderRadius: 0 }}>
                <span>SUBMIT</span>
              </button>
            </div>
          </div>
        </td>
      </React.Fragment>
    )
  }
}

export default CountryEditableTableRow