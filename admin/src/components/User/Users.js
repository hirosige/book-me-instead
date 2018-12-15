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
import TableContentsLoading from '../Shared/TableContentsLoading';

const Countries = (props) => (
  <div className=".l-main__content">
    <Query
      query={GET_USERS}
      variables={{
        first: props.recordPerPage,
        skip: (props.currentPage - 1) * props.recordPerPage,
        searchFilter: props.searchCondition,
      }}
      pollInterval={500}
    >
      {({ data, loading, error }) => {
        if (loading) return <TableContentsLoading />;
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
                  <th className="c-table-cell u-w200"><abbr title="Email">Email</abbr></th>
                  <th className="c-table-cell u-w200"><abbr title="Auth0 User ID">Auth0 User ID</abbr></th>
                  <th className="c-table-cell u-w200"><abbr title="Omise Customer ID">Omise Customer ID</abbr></th>
                  <th className="c-table-cell u-w150"><abbr title="Role">Role</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Favorites">Favorites</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(user => (
                  <User key={user.id} user={user} {...props} />
                ))}
              </tbody>
            </table>
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
  withUser(),
  withAuthorization(),
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