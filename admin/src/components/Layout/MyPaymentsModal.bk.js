import React from 'react'
import { compose } from 'recompose'
import WithMenuModal from '../../hocs/WithMenuModal';
import { Query } from "react-apollo";
import { GET_CUSTOMER } from '../../queries/OmiseCustomer'

const MyPaymentsModal = props => (
  <React.Fragment>
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <article className="media">
            <div className="media-content">
              <div className="content">
                <Query
                  query={GET_CUSTOMER}
                  variables={{
                    customerId: props.me.omiseCustomerId,
                  }}
                >
                  {({ data, loading, error }) => {
                    if (loading) return <div>Loading</div>;
                    if (error) return <div>Error {JSON.stringify(error)}</div>;

                    const { getCustomer } = data

                    if (getCustomer.cards.data.length === 0) {
                      return <div>クレジットカードが登録されてません</div>
                    }

                    return (
                      <div>{JSON.stringify(getCustomer.cards.data)}</div>
                    )
                  }}
                </Query>
              </div>
            </div>
          </article>
          <article className="media">
            <div className="media-content">
              <div className="content">
                <button className="button is-primary">
                  クレジットカードを登録する
                </button>
              </div>
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
    title: 'MY PAYMENTS',
  })
)(MyPaymentsModal)