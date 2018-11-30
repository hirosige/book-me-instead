import React from 'react'

class AddCreditCard extends React.Component {
  state = {
    card: {
      name: "",
      number: "",
      expiration_month: "",
      expiration_year: "",
      security_code: "",
    }
  }

  handleChange = (e) => {
    this.setState({
      card: {
        ...this.state.card,
        [e.target.name]: e.target.value
      }
    })
  }

  bookHotel = async () => {
    const { Omise } = window
    Omise.setPublicKey(process.env.REACT_APP_OMISE_PUBLIC_KEY);

    Omise.createToken(
      'card',
      this.state.card,
      (statusCode, response) => {

        if (statusCode === 200) {
          const cardToken = response.id
          console.log(cardToken)

        } else {
          console.log(response.message)
        }
      })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    this.bookHotel()
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          Name: <input type="text" name="name" value={this.state.card.name} onChange={this.handleChange} /><br />
          Number: <input type="text" name="number" value={this.state.card.number} onChange={this.handleChange} /><br />
          Expiration Month: <input type="text" name="expiration_month" value={this.state.card.expiration_month} onChange={this.handleChange} /><br />
          Expiration Year: <input type="text" name="expiration_year" value={this.state.card.expiration_year} onChange={this.handleChange} /><br />
          Security Code: <input type="text" name="security_code" value={this.state.card.security_code} onChange={this.handleChange} /><br />

          <button>Create Token</button>
        </form>
      </div>
    );
  }
}

export default AddCreditCard;
