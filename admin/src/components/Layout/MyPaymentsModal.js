import React from 'react'
import { compose } from 'recompose'
import WithMenuModal from '../../hocs/WithMenuModal';
import { Query } from "react-apollo";
import { GET_CUSTOMER } from '../../queries/OmiseCustomer'
import AddCreditCardButton from '../Payment/AddCreditCardButton';

class MyPaymentsModal extends React.PureComponent {
  state = {
    cardToken: "",
  }

  setCardToken = cardToken => {
    this.setState({ cardToken })
  }

  render () {
    return (
      <React.Fragment>
        {this.props.isActive === "is-active" && (
          <div class="box">
            <Query
              query={GET_CUSTOMER}
              variables={{
                customerId: this.props.me.omiseCustomerId,
              }}
            >
              {({ data, loading, error, refetch }) => {
                if (loading) return <div>Loading</div>;
                if (error) return <div>Error {JSON.stringify(error)}</div>;

                const { getCustomer } = data
                console.log(getCustomer)

                if (getCustomer.cards.data.length === 0) {
                  return (
                    <div>
                      <p>クレジットカードが登録されてません</p>
                      <button className="button" onClick={() => refetch()}>
                        Refetch
                      </button>
                    </div>
                  )
                }

                return (
                  <React.Fragment>
                    {getCustomer.cards.data.map(card => (
                      <article class="media">
                        <div class="media-content">
                          <div class="content">
                            <div class="box">
                              <div class="content">
                                <p>
                                  <strong>{card.bank}</strong> <small>{card.brand}</small> <small>{card.last_digits}</small>
                                  <br />
                                  Card Holder Name <strong>{card.name}</strong> <strong>{card.id === getCustomer.defaultCard && "Active"}</strong>
                                  <br />
                                  Valid until <small>{card.expiration_year}</small>/<small>{card.expiration_month}</small>
                                  &nbsp;Created at <small>{card.created}</small>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </React.Fragment>
                )
              }}
            </Query>
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <AddCreditCardButton
                    setCardToken={this.setCardToken}
                    {...this.props}
                  />
                </div>
              </div>
            </article>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default compose(
  WithMenuModal({
    title: 'MY PAYMENTS',
  })
)(MyPaymentsModal)