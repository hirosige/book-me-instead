import React from 'react'
import { Query, Mutation } from 'react-apollo';
import {
  CHANGE_ROLE,
  GET_USERS,
} from '../../queries/User'
import { ROLE_ENUM } from '../../queries/Enum'
import { produce } from 'immer';

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
                                },
                                optimisticResponse: {
                                  updateUser: {
                                    __typename: 'User',
                                    id: '-1',
                                    ...this.props.user,
                                    role: e.target.value
                                  }
                                },
                                update: (store, { data }) => {
                                  if (!data || !data.updateUser) {
                                    return;
                                  }

                                  const users = store.readQuery({
                                    query: GET_USERS,
                                    variables: this.props.indexVariables
                                  })

                                  store.writeQuery({
                                    data: produce(users, ds => {
                                      ds.allUsers[ds.allUsers.findIndex(user => user.id === data.updateUser.id)] =
                                        data.updateUser
                                    }),
                                    query: GET_USERS,
                                    variables: this.props.indexVariables,
                                  })
                                },
                              }).then(result => {
                                this.props.notifyUser({ type: "is-success", message: "Role has been successfully changed" })
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
            <button
              className="button is-small"
              onClick={this.toggleOpen}
            >
              CANCEL
            </button>
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