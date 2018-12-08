import React from 'react'
import HotelEditMutation from './HotelEditMutation'
import DeleteMutation from '../Shared/DeleteMutation'
import { DELETE_AN_HOTEL } from '../../queries/Hotel'
// import ImageModal from '../Shared/ImageModal';

const Hotel = ({ hotel }) => (
  <tr>
    <td>{hotel.name}</td>
    <td>
      {hotel.photos ? (
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-info u-no-br">{hotel.photos.count}</span>
            <span className="tag is-dark u-no-br">Photos</span>
          </div>
        </div>
      ) : (
        <div>No Images</div>
      )}
    </td>
    <td>
      <div className="field has-addons">
        <div className="control">
          <HotelEditMutation editItem={hotel} />
        </div>
        <div className="control">
          <DeleteMutation
            deleteId={hotel.id}
            title="DELETE HOTEL"
            message="Are you sure to delete ?"
            mutation={DELETE_AN_HOTEL}
          />
        </div>
      </div>
    </td>
  </tr>
)

export default Hotel