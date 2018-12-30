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
  GET_POST_CATEGORIES,
  GET_POST_CATEGORY_COUNT
} from '../../queries/PostCategory'
import NoDataFound from '../Shared/NoDataFound';
import TableContentsLoading from '../Shared/TableContentsLoading';
import PostCategory from './PostCategory';
import withOneDayTodo from '../../hocs/WithOneDayTodo';
import withMessageable from '../../hocs/WithMessageable'

const PostCategories = (props) => (
  <div className=".l-main__content">
    <Query
      query={GET_POST_CATEGORIES}
      variables={{
        first: props.recordPerPage,
        skip: (props.currentPage - 1) * props.recordPerPage,
        searchFilter: {
          ...props.searchCondition,
          isRoot: true,
        },
      }}
    >
      {({ data, loading, error }) => {
        if (loading) return <TableContentsLoading />;
        if (error) return <div>Error {JSON.stringify(error)}</div>;

        const { allPostCategories } = data

        if (allPostCategories.length === 0) {
          return <NoDataFound />
        }

        return (
          <div>
            <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th className="c-table-cell u-w150"><abbr title="Name">Name</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Posts">Posts</abbr></th>
                  <th className="c-table-cell u-w200"><abbr title="MakePost">Make Post</abbr></th>
                  <th className="c-table-cell u-w300"><abbr title="Breadcrumb">Breadcrumb</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                {allPostCategories.map(postCategory => (
                  <PostCategory key={postCategory.id} postCategory={postCategory} {...props} />
                ))}
              </tbody>
            </table>
            {props.onedayTodoHere('トップカテゴリの作成ボタンを作る')}
          </div>
        )
      }}
    </Query>
  </div>
)

export default compose(
  defaultProps({
    componentName: 'PostCategories',
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
    null,
    [
      { id: 1, type: "name", name: "Name" },
    ],
    'name',
  ),
  withPagination(
    GET_POST_CATEGORY_COUNT,
    { isRoot: true }
  ),
  hasLogger(false),
)(PostCategories)
