import React from 'react'
import CountryDeleteMutation from './CountryDeleteMutation';
import CountryEditMutation from './CountryEditMutation';

const Country = ({ country }) => (
  <tr>
    <td>{country.name}</td>
    <td>{country.code}</td>
    <td>{country.slug}</td>
    <td>
      <div className="field has-addons">
        <div className="control">
          <CountryEditMutation editItem={country} />
        </div>
        <div className="control">
          <CountryDeleteMutation deleteId={country.id} />
        </div>
      </div>
    </td>
  </tr>
)

export default Country