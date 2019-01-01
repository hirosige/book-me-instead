import React from 'react'
import { compose, defaultProps } from 'recompose'
import { withRouter } from 'react-router';
import { Query } from "react-apollo";
import hasLogger from '../../hocs/HasLogger'
import withAuthentication from '../../hocs/WithAuthentication'
import withAuthorization from '../../hocs/WithAuthorization';
import withAdminLayout from '../../hocs/WithAdminLayout';
import withUser from '../../hocs/WithUser';
import withSearchBox from '../../hocs/WithSearchBox';
import User from './User';
import withPagination from '../../hocs/WithPagination';
import {
  GET_USERS,
  GET_USER_COUNT
} from '../../queries/User'
import NoDataFound from '../Shared/NoDataFound';
import withOneDayTodo from '../../hocs/WithOneDayTodo';
import withMessageable from '../../hocs/WithMessageable'
import ToolBox from '../Shared/ToolBox';
import ReadMoreButton from '../Shared/ReadMoreButton';
import UserTableLoading from './UserTableLoading';

const Countries = (props) => (
  <div className=".l-main__content">
    <ToolBox>
      TOOL BOX
    </ToolBox>
    <Query
      query={GET_USERS}
      variables={{
        first: props.recordPerPage,
        skip: (props.currentPage - 1) * props.recordPerPage,
        searchFilter: props.searchCondition,
      }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <UserTableLoading />
        if (error) return <div>Error {JSON.stringify(error)}</div>;

        const { allUsers } = data

        if (allUsers.length === 0) {
          return <NoDataFound />
        }

        return (
          <div>
            <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th className="c-table-cell u-w100"><abbr title="Email">Email</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Auth0 User ID">Auth0 User ID</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Omise Customer ID">Omise Customer ID</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Role">Role</abbr></th>
                  <th className="c-table-cell u-w50"><abbr title="Favorites">Favorites</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(user => (
                  <User
                    key={user.id}
                    user={user}
                    indexQuery={GET_USERS}
                    indexVariables={{
                      first: props.recordPerPage,
                      skip: (props.currentPage - 1) * props.recordPerPage,
                      searchFilter: props.searchCondition,
                    }}
                    {...props}
                  />
                ))}
              </tbody>
            </table>

            <ReadMoreButton
              fetchMore={fetchMore}
              modelName={`allUsers`}
              modelData={allUsers}
            />
          </div>
        )
      }}
    </Query>
  </div>
)

export default compose(
  defaultProps({
    componentName: 'User',
    transactionType: 'List',
  }),
  withRouter, // via react-router
  withAuthentication(),
  withOneDayTodo(),
  withUser(),
  withAuthorization(),
  withMessageable(),
  withAdminLayout(),
  withSearchBox(
    /* for create button */
    null,
    /* for search columns */
    [
      { id: 1, type: "email", name: "Email" },
      { id: 2, type: "auth0UserId", name: "Auth0 User ID" },
      { id: 3, type: "omiseCustomerId", name: "Omise Customer ID" },
      { id: 4, type: "role", name: "Role" },
    ],
    /* default search column */
    'email'
  ),
  withPagination(GET_USER_COUNT),
  hasLogger(false),
)(Countries)
