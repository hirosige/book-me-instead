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

const Advantages = (props) => (
  <React.Fragment>
    <Query
      query={GET_ADVANTAGES}
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
                  <Advantage key={advantage.id} advantage={advantage} />
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
    componentName: 'Advantage',
    transactionType: 'List',
  }),
  withRouter, // via react-router
  withAuthentication(),
  withUser(),
  withAuthorization(),
  withAdminLayout(),
  withSearchBox(
    /* for create button */
    AdvantageCreateMutation
  ),
  withPagination(GET_ADVANTAGE_COUNT),
  hasLogger(false),
)(Advantages)
