import React from 'react'
import { compose } from 'recompose'
import WithMenuModal from '../../hocs/WithMenuModal';

const MyBookingsModal = props => (
  <React.Fragment>
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" alt="card" />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <div className="level-item" aria-label="reply">
                    <span className="icon is-small">
                      <i className="fas fa-reply" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="level-item" aria-label="retweet">
                    <span className="icon is-small">
                      <i className="fas fa-retweet" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="level-item" aria-label="like">
                    <span className="icon is-small">
                      <i className="fas fa-heart" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => {
          props.toggleIsActive()
          props.switchModal()
        }}
      ></button>
    </div>
  </React.Fragment>
)

export default compose(
  WithMenuModal({
    title: 'MY BOOKINGS',
  })
)(MyBookingsModal)
