import React from 'react'
import { compose, defaultProps } from 'recompose'
import { withRouter } from 'react-router';
import { Query } from "react-apollo";
import hasLogger from '../../hocs/HasLogger'
import withAuthentication from '../../hocs/WithAuthentication'
import withAuthorization from '../../hocs/WithAuthorization';
import withAdminLayout from '../../hocs/WithAdminLayout';
import withUser from '../../hocs/WithUser';
import withStatelessToolHeader from '../../hocs/WithStatelessToolHeader';
import { GET_TRANSACTIONS } from '../../queries/OmiseCustomer'
import NoDataFound from '../Shared/NoDataFound';
import TableContentsLoading from '../Shared/TableContentsLoading';
import Transaction from './Transaction';
import withOneDayTodo from '../../hocs/WithOneDayTodo';
import withMessageable from '../../hocs/WithMessageable'

const Transactions = (props) => (
  <div className=".l-main__content">
    <React.Fragment>
      <Query
        query={GET_TRANSACTIONS}
        // variables={{
        //   first: props.recordPerPage,
        //   skip: (props.currentPage - 1) * props.recordPerPage,
        //   searchFilter: {
        //     ...props.searchCondition,
        //     isRoot: true,
        //   },
        // }}
      >
        {({ data, loading, error }) => {
          if (loading) return <TableContentsLoading />;
          if (error) return <div>Error {JSON.stringify(error)}</div>;

          const { getTransactions } = data

          if (getTransactions.length === 0) {
            return <NoDataFound />
          }

          console.log(getTransactions)

          return (
            <div>
              <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th className="c-table-cell u-w100"><abbr title="ID">ID</abbr></th>
                    <th className="c-table-cell u-w100"><abbr title="Source">Charge ID</abbr></th>
                    <th className="c-table-cell u-w100"><abbr title="Object">Object</abbr></th>
                    <th className="c-table-cell u-w50"><abbr title="Type">Type</abbr></th>
                    <th className="c-table-cell u-w50"><abbr title="Currency">Currency</abbr></th>
                    <th className="c-table-cell u-w100"><abbr title="Amount">Amount</abbr></th>
                    <th className="c-table-cell u-w100"><abbr title="Created">Created</abbr></th>
                    <th className="c-table-cell u-w100"><abbr title="Transferable">Transferable</abbr></th>
                  </tr>
                </thead>
                <tbody>
                  {getTransactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction} {...props} />
                  ))}
                </tbody>
              </table>
            </div>
          )
        }}
      </Query>
      {props.onedayTodoHere('ページネーションを作る')}<br />
      {props.onedayTodoHere('To/Fromの検索を作る')}
    </React.Fragment>
  </div>
)

export default compose(
  defaultProps({
    componentName: 'Transaction',
    transactionType: 'List',
  }),
  withRouter, // via react-router
  withAuthentication(),
  withOneDayTodo(),
  withUser(),
  withAuthorization(),
  withMessageable(),
  withAdminLayout(),
  withStatelessToolHeader("TRANSACTIONS"),
  // withPagination(
  //   GET_POST_CATEGORY_COUNT,
  //   { isRoot: true }
  // ),
  hasLogger(false),
)(Transactions)
