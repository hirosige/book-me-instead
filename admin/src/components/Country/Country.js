import React from 'react'
import CountryEditMutation from './CountryEditMutation';
import ManageArea from './ManageArea';
import CountryDeleteMutation from './CountryDeleteMutation';

const Country = ({
  country,
  notifyUser,
  indexVariables
}) => {

  return (
    <tr>
      <td>{country.name}</td>
      <td>{country.code}</td>
      <td>{country.slug}</td>
      <td>
          {country.areas.length !== 0 && (
            <div className="c-tag-cloud" style={{ marginBottom: "10px" }}>
              {country.areas.map(area => (
                <span key={area.id} className="tag is-danger">{area.name}</span>
              ))}
            </div>
          )}
          <ManageArea
            country={country}
            notifyUser={notifyUser}
            indexVariables={indexVariables}
          />
      </td>
      <td>
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-info u-no-br">{country.hotels.length}</span>
            <span className="tag is-dark u-no-br">Hotels</span>
          </div>
        </div>
      </td>
      <td>
        <div className="field has-addons">
          <div className="control">
            <CountryEditMutation
              editItem={country}
              notifyUser={notifyUser}
              indexVariables={indexVariables}
            />
          </div>
          <div className="control">
            <CountryDeleteMutation
              country={country}
              indexVariables={indexVariables}
            />
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Country
