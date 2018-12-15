import React from 'react'
import { Mutation } from 'react-apollo';
import { CREATE_AREA } from '../../queries/Area'
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame';

class ManageArea extends React.Component {
  state = {
    isOpen: false,
    area: {
      name: "",
      code: "",
      slug: "",
    },
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  initializeState = () => {
    this.setState({
      area: {
        name: "",
        code: "",
        slug: "",
      },
    })
  }

  handleChange = e => {
    this.setState({
      area: {
        ...this.state.area,
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

                  mutate({
                    variables: {
                      countryId: this.props.country.id,
                      ...this.state.area,
                    }
                  }).then(result => {
                    this.initializeState()
                  })
                }}>
                  {error && (
                    <div>{error.message}</div>
                  )}
                  <HorizontalInputBoxFrame
                    columnName="Name"
                  >
                    <input
                      name="name"
                      className={`input`}
                      type="text"
                      placeholder="Name"
                      value={this.state.area.name}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                  <HorizontalInputBoxFrame
                    columnName="Code"
                  >
                    <input
                      name="code"
                      className={`input`}
                      type="text"
                      placeholder="Code"
                      value={this.state.area.code}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                  <HorizontalInputBoxFrame
                    columnName="Slug"
                  >
                    <input
                      name="slug"
                      className={`input`}
                      type="text"
                      placeholder="Slug"
                      value={this.state.area.slug}
                      onChange={this.handleChange}
                    />
                  </HorizontalInputBoxFrame>
                  <button className="button is-small">
                    SUBMIT
                  </button>
                  <div className="button is-small" onClick={this.toggleOpen}>
                    CANCEL
                  </div>
                </form>
              </React.Fragment>
            )}
          </Mutation>
        ) : (
          <button
            className="button is-small is-primary"
            onClick={this.toggleOpen}
          >
            Manage Areas
          </button>
        )}
      </React.Fragment>
    )
  }
}

export default ManageArea