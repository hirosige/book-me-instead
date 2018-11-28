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
import CountryCreateMutation from './CountryCreateMutation';
import Country from './Country';
import withPagination from '../../hocs/WithPagination';
import {
  GET_COUNTRIES,
  GET_COUNTRY_COUNT
} from '../../queries/Country'
import NoDataFound from '../Shared/NoDataFound';
import TableContentsLoading from '../Shared/TableContentsLoading';

const Countries = (props) => (
  <React.Fragment>
    <Query
      query={GET_COUNTRIES}
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

        const { allCountries } = data

        if (allCountries.length === 0) {
          return <NoDataFound />
        }

        return (
          <div>
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th><abbr title="Name">Name</abbr></th>
                  <th><abbr title="Breed">Code</abbr></th>
                  <th><abbr title="Breed">Slug</abbr></th>
                  <th><abbr title="Breed">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                {allCountries.map(country => (
                  <Country key={country.id} country={country} />
                ))}
              </tbody>
            </table>
          </div>
        )
      }}
    </Query>
  </React.Fragment>
)

export default compose(
  defaultProps({
    componentName: 'Country',
    transactionType: 'List',
  }),
  withRouter, // via react-router
  withAuthentication(),
  withUser(),
  withAuthorization(),
  withAdminLayout(),
  withSearchBox(
    /* for create button */
    CountryCreateMutation
  ),
  withPagination(GET_COUNTRY_COUNT),
  hasLogger(false),
)(Countries)
