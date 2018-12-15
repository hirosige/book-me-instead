import React from 'react'
import { Mutation } from "react-apollo";
import { CREATE_FAVORITE } from '../../queries/Favorite'

const AddFavoriteButton = ({ hotel, me }) => {
  const isFavoritedBefore =
    hotel.favorites
      .map(favorite => {
        if (favorite.user.id === me.id) return true
        else return false
      })
      .some(favorite => favorite)

  return (
    <React.Fragment>
      {isFavoritedBefore ? (
        <button className="button is-small is-static">
          <span className="icon">
            <i className="fas fa-heart"></i>
          </span>
        </button>
      ) : (
        <Mutation mutation={CREATE_FAVORITE}>
          {(mutate, { data, loading, error }) => (
            <React.Fragment>
              <button
                className="button is-small is-primary"
                onClick={e => {
                  e.preventDefault();

                  mutate({
                    variables: {
                      userId: me.id,
                      hotelsId: hotel.id
                    }
                  })
                }}
              >
                <span className="icon">
                  <i className="fas fa-heart"></i>
                </span>
              </button>
            </React.Fragment>
          )}
        </Mutation>
      )}
    </React.Fragment>
  )
}

export default AddFavoriteButton