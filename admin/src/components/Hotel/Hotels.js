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
import HotelCreateMutation from './HotelCreateMutation';
import Hotel from './Hotel';
import withPagination from '../../hocs/WithPagination';
import {
  GET_HOTELS,
  GET_HOTEL_COUNT
} from '../../queries/Hotel'
import NoDataFound from '../Shared/NoDataFound';
import TableContentsLoading from '../Shared/TableContentsLoading';
import withOneDayTodo from '../../hocs/WithOneDayTodo';
import withMessageable from '../../hocs/WithMessageable'

const Hotels = (props) => (
  <div className=".l-main__content">
    <Query
      query={GET_HOTELS}
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

        const { allHotels } = data

        if (allHotels.length === 0) {
          return <NoDataFound />
        }

        return (
          <div>
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th><abbr title="Name">Name</abbr></th>
                  <th><abbr title="Rooms">Rooms</abbr></th>
                  <th><abbr title="Relations">Relations</abbr></th>
                  <th><abbr title="isPublished">isPublished</abbr></th>
                  <th><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                {allHotels.map(hotel => (
                  <Hotel
                    key={hotel.id}
                    hotel={hotel}
                    {...props}
                  />
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
    componentName: 'Hotel',
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
    HotelCreateMutation,
    /* for search columns */
    [
      { id: 1, type: "name", name: "Name" },
    ],
    'name',
  ),
  withPagination(GET_HOTEL_COUNT),
  hasLogger(false),
)(Hotels)
