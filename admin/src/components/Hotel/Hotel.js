import React from 'react'
import HotelEditMutation from './HotelEditMutation'
import DeleteMutation from '../Shared/DeleteMutation'
import { DELETE_AN_HOTEL } from '../../queries/Hotel'
import AddFavoriteButton from './AddFavoriteButton';
import PublishHotelButton from './PublishHotelButton';
import MakePrivateHotelButton from './MakePrivateHotelButton';
import Rooms from './Rooms';
import ReviewButton from './ReviewButton';
import HotelDeleteMutation from './HotelDeleteMutation';

const Hotel = ({
  hotel,
  me,
  notifyUser,
  indexVariables,
  onedayTodoHere,
}) => {

  return (
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
        {hotel.advantages ? (
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-info u-no-br">{hotel.advantages.length}</span>
              <span className="tag is-dark u-no-br">Advantages</span>
            </div>
          </div>
        ) : (
          <div>No Images</div>
        )}
        {hotel.favorites ? (
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-info u-no-br">{hotel.favorites.length}</span>
              <span className="tag is-dark u-no-br">Users Love This</span>
            </div>
          </div>
        ) : (
          <div>No Reviews</div>
        )}
        {hotel.reviews ? (
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-info u-no-br">{hotel.reviews.length}</span>
              <span className="tag is-dark u-no-br">Reviews</span>
            </div>
          </div>
        ) : (
          <div>No Reviews</div>
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
            <HotelDeleteMutation
              hotel={hotel}
              notifyUser={notifyUser}
              indexVariables={indexVariables}
            />
          </div>
          <div className="control">
            <AddFavoriteButton
              hotel={hotel}
              me={me}
            />
          </div>
          <div className="control">
            <ReviewButton
              hotel={hotel}
              user={me}
            />
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Hotel
