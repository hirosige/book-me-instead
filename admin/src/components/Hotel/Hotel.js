import React from 'react'
import HotelEditMutation from './HotelEditMutation'
import DeleteMutation from '../Shared/DeleteMutation'
import { DELETE_AN_HOTEL } from '../../queries/Hotel'
import AddFavoriteButton from './AddFavoriteButton';
import PublishHotelButton from './PublishHotelButton';
import MakePrivateHotelButton from './MakePrivateHotelButton';
import Rooms from './Rooms';
// import ImageModal from '../Shared/ImageModal';

const Hotel = ({ hotel, me }) => (
  <tr>
    <td>{hotel.name}</td>
    <td>
      {hotel.rooms.length !== 0 ? (
        <Rooms
          me={me}
          hotel={hotel}
          rooms={hotel.rooms}
        />
      ) : (
        <span className="tag is-warning">No Room Registered</span>
      )}
    </td>
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
      {hotel.photos ? (
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-info u-no-br">{hotel.advantages.length}</span>
            <span className="tag is-dark u-no-br">Advantages</span>
          </div>
        </div>
      ) : (
        <div>No Images</div>
      )}
    </td>
    <td>
        {hotel.isPublished ? (
          <React.Fragment>
            <div className="tags has-addons" style={{ marginBottom: 0 }}>
              <span className="tag">Currently</span>
              <span className="tag is-primary">{`People can see`}</span>
            </div>
            <MakePrivateHotelButton hotel={hotel} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="tags has-addons" style={{ marginBottom: 0 }}>
              <span className="tag">Currently</span>
              <span className="tag is-warning">{`People cannot see`}</span>
            </div>
            <PublishHotelButton hotel={hotel} />
          </React.Fragment>
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
            title="Are you sure to delete ?"
            mutation={DELETE_AN_HOTEL}
          />
        </div>
        <div className="control">
          <AddFavoriteButton
            hotel={hotel}
            me={me}
          />
        </div>
      </div>
    </td>
  </tr>
)

export default Hotel