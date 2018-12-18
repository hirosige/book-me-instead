import React from 'react'
import DeleteMutation from '../Shared/DeleteMutation';
import CountryEditMutation from './CountryEditMutation';
import { DELETE_A_COUNTRY } from '../../queries/Country'
import ManageArea from './ManageArea';

const Country = ({ country, notifyUser }) => (
  <tr>
    <td>{country.name}</td>
    <td>{country.code}</td>
    <td>{country.slug}</td>
    <td>
      {country.areas.length !== 0 ? (
        <React.Fragment>
          <div className="c-tag-cloud" style={{ marginBottom: "10px" }}>
            {country.areas.map(area => (
              <span
                key={area.id}
                className="tag is-danger"
              >{area.name}</span>
            ))}
          </div>
          <ManageArea
            country={country}
            notifyUser={notifyUser}
          />
        </React.Fragment>
      ) : (
        <ManageArea
          country={country}
          notifyUser={notifyUser}
        />
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
          <CountryEditMutation
            editItem={country}
            notifyUser={notifyUser}
          />
        </div>
        <div className="control">
          <DeleteMutation
            deleteId={country.id}
            title="Are you sure to delete ?"
            mutation={DELETE_A_COUNTRY}
            notifyUser={notifyUser}
          />
        </div>
      </div>
    </td>
  </tr>
)

export default Country