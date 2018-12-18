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

import withPagination from '../../hocs/WithPagination';
import {
  GET_BOOKINGS,
  GET_BOOKING_COUNT
} from '../../queries/Booking'
import NoDataFound from '../Shared/NoDataFound';
import TableContentsLoading from '../Shared/TableContentsLoading';
import Booking from './Booking';
import withOneDayTodo from '../../hocs/WithOneDayTodo';
import withMessageable from '../../hocs/WithMessageable'

const Bookings = (props) => (
  <div className=".l-main__content">
    <Query
      query={GET_BOOKINGS}
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

        const { allBookings } = data

        if (allBookings.length === 0) {
          return <NoDataFound />
        }

        return (
          <div>
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th><abbr title="BookingID">Booking ID</abbr></th>
                  <th><abbr title="IsPaid">Customer Paid?</abbr></th>
                  <th><abbr title="IsConfirmed">Staff Confirmed?</abbr></th>
                  <th><abbr title="CheckIn">CheckIn</abbr></th>
                  <th><abbr title="CheckOut">CheckOut</abbr></th>
                  <th><abbr title="Hotel">Hotel</abbr></th>
                  <th><abbr title="User">User</abbr></th>
                  <th><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map(booking => (
                  <Booking key={booking.id} booking={booking} {...props} />
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
    componentName: 'Booking',
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
      { id: 1, type: "name", name: "Name" },
    ],
    'name',
  ),
  withPagination(GET_BOOKING_COUNT),
  hasLogger(false),
)(Bookings)
