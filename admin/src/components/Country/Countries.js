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
import withOneDayTodo from '../../hocs/WithOneDayTodo';
import withMessageable from '../../hocs/WithMessageable'
import ReadMoreButton from '../Shared/ReadMoreButton';
import ToolBox from '../Shared/ToolBox';

const Countries = (props) => (
  <div className=".l-main__content">
    <ToolBox>
      <CountryCreateMutation {...props} indexVariables={{
        first: props.recordPerPage,
        skip: (props.currentPage - 1) * props.recordPerPage,
        searchFilter: props.searchCondition,
      }} />
    </ToolBox>
    <Query
      query={GET_COUNTRIES}
      variables={{
        first: props.recordPerPage,
        skip: (props.currentPage - 1) * props.recordPerPage,
        searchFilter: props.searchCondition,
      }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <TableContentsLoading />;
        if (error) return <div>Error {JSON.stringify(error)}</div>;

        const { allCountries } = data

        if (allCountries.length === 0) {
          return <NoDataFound />
        }

        return (
          <div>
            <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th className="c-table-cell u-w100"><abbr title="Name">Name</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Breed">Code</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Slug">Slug</abbr></th>
                  <th className="c-table-cell u-w250"><abbr title="Areas">Areas</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Areas">Hotels</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                {allCountries.map(country => (
                  <Country
                    key={country.id}
                    country={country}
                    indexQuery={GET_COUNTRIES}
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
              modelName={`allCountries`}
              modelData={allCountries}
            />
          </div>
        )
      }}
    </Query>
  </div>
)

export default compose(
  defaultProps({
    componentName: 'Country',
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
      { id: 2, type: "code", name: "Code" },
      { id: 3, type: "slug", name: "Slug" },
    ],
    'name',
  ),
  withPagination(GET_COUNTRY_COUNT),
  hasLogger(false),
)(Countries)
