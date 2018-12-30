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
import ContactCreateMutation from './ContactCreateMutation';
import Contact from './Contact';
import withPagination from '../../hocs/WithPagination';
import {
  GET_CONTACTS,
  GET_CONTACT_COUNT
} from '../../queries/Contact'
import NoDataFound from '../Shared/NoDataFound';
import TableContentsLoading from '../Shared/TableContentsLoading';
import withOneDayTodo from '../../hocs/WithOneDayTodo';
import withMessageable from '../../hocs/WithMessageable'

const Contacts = (props) => (
  <div className=".l-main__content">
    <Query
      query={GET_CONTACTS}
      variables={{
        first: props.recordPerPage,
        skip: (props.currentPage - 1) * props.recordPerPage,
        searchFilter: props.searchCondition,
      }}
    >
      {({ data, loading, error }) => {
        if (loading) return <TableContentsLoading />;
        if (error) return <div>Error {JSON.stringify(error)}</div>;

        const { allContacts } = data

        if (allContacts.length === 0) {
          return <NoDataFound />
        }

        return (
          <div>
            <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th className="u-w150"><abbr title="Inquery ID">Inquery ID</abbr></th>
                  <th className="u-w150"><abbr title="Title">Title</abbr></th>
                  <th className="u-w150"><abbr title="Description">Description</abbr></th>
                  <th className="u-w50"><abbr title="IsReplied">Is Replied</abbr></th>
                  <th className="u-w50"><abbr title="Reply">Reply</abbr></th>
                  <th className="u-w100"><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                {allContacts.map(contact => (
                  <Contact key={contact.id} contact={contact} {...props} />
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
    componentName: 'Contact',
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
    ContactCreateMutation,
    /* for search columns */
    [
      { id: 1, type: "name", name: "Name" },
    ],
    'name',
  ),
  withPagination(GET_CONTACT_COUNT),
  hasLogger(false),
)(Contacts)
