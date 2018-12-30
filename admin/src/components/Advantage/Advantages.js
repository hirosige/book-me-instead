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
import AdvantageCreateMutation from './AdvantageCreateMutation';
import Advantage from './Advantage';
import withPagination from '../../hocs/WithPagination';
import {
  GET_ADVANTAGES,
  GET_ADVANTAGE_COUNT
} from '../../queries/Advantage'
import NoDataFound from '../Shared/NoDataFound';
import TableContentsLoading from '../Shared/TableContentsLoading';
import withOneDayTodo from '../../hocs/WithOneDayTodo';
import withMessageable from '../../hocs/WithMessageable'
import ToolBox from '../Shared/ToolBox';
import ReadMoreButton from '../Shared/ReadMoreButton';

const Advantages = (props) => (
  <div className=".l-main__content">
    <ToolBox>
      <AdvantageCreateMutation {...props} indexVariables={{
        first: props.recordPerPage,
        skip: (props.currentPage - 1) * props.recordPerPage,
        searchFilter: props.searchCondition,
      }} />
    </ToolBox>
    <Query
      query={GET_ADVANTAGES}
      variables={{
        first: props.recordPerPage,
        skip: (props.currentPage - 1) * props.recordPerPage,
        searchFilter: props.searchCondition,
      }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <TableContentsLoading />;
        if (error) return <div>Error {JSON.stringify(error)}</div>;

        const { allAdvantages } = data

        if (allAdvantages.length === 0) {
          return <NoDataFound />
        }

        return (
          <div>
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th><abbr title="Name">Name</abbr></th>
                  <th><abbr title="Name">Icon</abbr></th>
                  <th><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                {allAdvantages.map(advantage => (
                  <Advantage
                    key={advantage.id}
                    advantage={advantage}
                    indexQuery={GET_ADVANTAGES}
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
              modelName={`allAdvantages`}
              modelData={allAdvantages}
            />
          </div>
        )
      }}
    </Query>
  </div>
)

export default compose(
  defaultProps({
    componentName: 'Advantage',
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
  withPagination(GET_ADVANTAGE_COUNT),
  hasLogger(false),
)(Advantages)
