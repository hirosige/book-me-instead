import React from 'react'
import DeleteMutation from '../Shared/DeleteMutation';
import CountryEditMutation from './CountryEditMutation';
import { DELETE_A_COUNTRY } from '../../queries/Country'

const Country = ({ country }) => (
  <tr>
    <td>{country.name}</td>
    <td>{country.code}</td>
    <td>{country.slug}</td>
    <td>
      {country.areas.length !== 0 ? (
        <div className="c-tag-cloud">
          {country.areas.map(area => (
            <span
              key={area.id}
              className="tag is-danger"
            >{area.name}</span>
          ))}
        </div>
      ) : (
        <div>エリアなし</div>
      )}
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
          <CountryEditMutation editItem={country} />
        </div>
        <div className="control">
          <DeleteMutation
            deleteId={country.id}
            title="DELETE COUNTRY"
            message="Are you sure to delete ?"
            mutation={DELETE_A_COUNTRY}
          />
        </div>
      </div>
    </td>
  </tr>
)

export default Country