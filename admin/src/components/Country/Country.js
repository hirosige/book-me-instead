import React from 'react'
import CountryDeleteMutation from './CountryDeleteMutation';
import CountryEditMutation from './CountryEditMutation';

const Country = ({ country }) => (
  <tr>
    <td>{country.name}</td>
    <td>{country.code}</td>
    <td>{country.slug}</td>
    <td>
      {country.areas.length !== 0 ? (
        <div className="c-tag-cloud">
          {country.areas.map(area => (
            <span className="tag is-danger">{area.name}</span>
          ))}
        </div>
      ) : (
        <div>エリアなし</div>
      )}
    </td>
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