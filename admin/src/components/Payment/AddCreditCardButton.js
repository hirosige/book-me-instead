import React from 'react'
import { Mutation, graphql } from 'react-apollo';
import { CREATE_AREA } from '../../queries/Area'
import { ADD_CARD_TO_CUSTOMER } from '../../queries/OmiseCustomer'
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame';

class AddCreditCardButton extends React.Component {
  state = {
    isOpen: false,
    card: {
      name: "",
      number: "",
      expiration_month: "",
      expiration_year: "",
      security_code: "",
    },
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  initializeState = () => {
    this.setState({
      card: {
        name: "",
        number: "",
        expiration_month: "",
        expiration_year: "",
        security_code: "",
      },
    })
  }

  handleChange = e => {
    this.setState({
      card: {
        ...this.state.card,
        [e.target.name]: e.target.value
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        {this.state.isOpen ? (
          <Mutation mutation={CREATE_AREA}>
            {(mutate, { data, loading, error }) => (
              <React.Fragment>
                <form onSubmit={e => {
                  e.preventDefault();

                  const { Omise } = window
                  Omise.setPublicKey(process.env.REACT_APP_OMISE_PUBLIC_KEY);

                  Omise.createToken(
                    'card',
                    this.state.card,
                    (statusCode, response) => {
                      if (statusCode === 200) {
                        const cardToken = response.id
                        this.props.addCardToCustomer({
                          variables: {
                            customerId: this.props.me.omiseCustomerId,
                            cardToken,
                          }
                        }).catch(e => {
                          console.log('e', e)
                        })
                      } else {
                        console.log(response.message)
                      }
                    })
                }}>
                  {error && (
                    <div>{error.message}</div>
                  )}
                  <HorizontalInputBoxFrame
                    columnName="Card Holder Name"
                  >
                    <input
                      name="name"
                      className={`input`}
                      type="text"
                      placeholder="Name"
                      value={this.state.card.name}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                  <HorizontalInputBoxFrame
                    columnName="Card Number"
                  >
                    <input
                      name="number"
                      className={`input`}
                      type="text"
                      placeholder="Number"
                      value={this.state.card.number}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                  <HorizontalInputBoxFrame
                    columnName="Expiration Month"
                  >
                    <input
                      name="expiration_month"
                      className={`input`}
                      type="number"
                      placeholder="Expiration Month"
                      value={this.state.card.expiration_month}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                  <HorizontalInputBoxFrame
                    columnName="Expiration Year"
                  >
                    <input
                      name="expiration_year"
                      className={`input`}
                      type="number"
                      placeholder="Expiration Year"
                      value={this.state.card.expiration_year}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                  <HorizontalInputBoxFrame
                    columnName="Security Code"
                  >
                    <input
                      name="security_code"
                      className={`input`}
                      type="text"
                      placeholder="Security Code"
                      value={this.state.card.security_code}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                  <button className="button is-primary">
                    SUBMIT
                  </button>
                  <div className="button" onClick={this.toggleOpen}>
                    CANCEL
                  </div>
                </form>
              </React.Fragment>
            )}
          </Mutation>
        ) : (
          <button
            className="button is-primary"
            onClick={this.toggleOpen}
          >
            Add Credit Card
          </button>
        )}
      </React.Fragment>
    )
  }
}

export default graphql(
  ADD_CARD_TO_CUSTOMER, { name: "addCardToCustomer" }
)(AddCreditCardButton)
