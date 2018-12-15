import React from 'react'
import { Query, Mutation } from 'react-apollo';
import { CHANGE_ROLE } from '../../queries/User'
import { ROLE_ENUM } from '../../queries/Enum'

class ChangeRole extends React.Component {
  state = {
    isOpen: false,
    selectedRole: this.props.user.role
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    return (
      <React.Fragment>
        {this.state.isOpen ? (
          <React.Fragment>
            <span className="select is-small" style={{ marginRight: "10px", paddingRight: "10px", }} >
              <Query
                query={ROLE_ENUM}
                variables={{
                  first: 100,
                  skip: 0,
                  searchFilter: {},
                }}
              >
                {({ data, loading, error }) => {
                  if (loading) return 'loading'
                  if (error) return <div>Error {JSON.stringify(error)}</div>;

                  const { __type } = data

                  if (__type.enumValues.length === 0) {
                    return 'no data'
                  }

                  return (
                    <Mutation
                      mutation={CHANGE_ROLE}
                    >
                      {(mutate, { data, loading, error }) => (
                        <React.Fragment>
                          <select
                            onChange={e => {
                              e.preventDefault();

                              mutate({
                                variables: {
                                  id: this.props.user.id,
                                  role: e.target.value
                                }
                              }).then(result => {
                                this.toggleOpen()
                              });
                            }}
                            className="u-no-br"
                            name="role"
                            defaultValue={this.props.user.role}
                          >
                            <option value="">Please select role</option>
                            {__type.enumValues.map((role, i) => (
                              <option
                                key={i}
                                value={role.name}
                              >{role.name}</option>
                            ))}
                          </select>
                        </React.Fragment>
                      )}
                    </Mutation>
                  )
                }}
              </Query>
            </span>
            <butto
              className="button is-small"
              onClick={this.toggleOpen}
            >
              CANCEL
            </butto>
          </React.Fragment>
        ) : (
          <button
            className="button is-small is-primary"
            onClick={this.toggleOpen}
          >
            Change Role
          </button>
        )}
      </React.Fragment>
    )
  }
}

export default ChangeRole