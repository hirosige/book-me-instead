import React from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const UPDATE_DOG = gql`
  mutation UpdateDog(
    $id: ID!
    $name: String!
    $breed: String!
  ) {
    updateDog(
      id: $id
      name: $name
      breed: $breed
    ) {
      id
      name
      breed
    }
  }
`;

class CountryEditMutation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: "",
    }
  }

  switchModal = () => {
    if (this.state.isActive === "is-active") {
      this.setState({ isActive: "" })
    } else {
      this.setState({ isActive: "is-active" })
    }
  }

  render () {
    let id = this.props.editItem.id
    let name = this.props.editItem.name
    let breed = this.props.editItem.breed

    return (
      <React.Fragment>
        <button className="button is-primary is-small" onClick={this.switchModal}>EDIT</button>
        <div className={`modal ${this.state.isActive}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <Mutation
              mutation={UPDATE_DOG}
            >
              {(createDog, { data }) => (
                <form
                  onSubmit={e => {
                    console.log('test')
                    e.preventDefault();
                    createDog({ variables: {
                      id,
                      name: name.value,
                      breed: breed.value
                    }});
                    name.value = "";
                    breed.value = "";
                    this.switchModal()
                  }}
                >
                <header className="modal-card-head">
                  <div className="modal-card-title">Update Dog</div>
                  <div className="delete" aria-label="close" onClick={this.switchModal}></div>
                </header>
                <section className="modal-card-body">
                  <input
                    ref={name}
                  />
                  <input
                    ref={breed}
                  />
                  </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" type="submit">Save changes</button>
                  <div className="button" onClick={this.switchModal}>Cancel</div>
                </footer>
              </form>
              )}
            </Mutation>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default CountryEditMutation