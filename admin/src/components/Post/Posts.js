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
  GET_POSTS,
  GET_POST_COUNT
} from '../../queries/Post'
import NoDataFound from '../Shared/NoDataFound';
import TableContentsLoading from '../Shared/TableContentsLoading';
import Post from './Post';
import PostCreateMutation from './PostCreateMutation';
import withOneDayTodo from '../../hocs/WithOneDayTodo';
import withMessageable from '../../hocs/WithMessageable'
import ToolBox from '../Shared/ToolBox';

const Posts = (props) => (
  <div className=".l-main__content">
    <ToolBox>
      <PostCreateMutation {...props} indexVariables={{
        first: props.recordPerPage,
        skip: (props.currentPage - 1) * props.recordPerPage,
        searchFilter: props.searchCondition,
      }} />
    </ToolBox>
    <Query
      query={GET_POSTS}
      variables={{
        first: props.recordPerPage,
        skip: (props.currentPage - 1) * props.recordPerPage,
        searchFilter: props.searchCondition,
      }}
    >
      {({ data, loading, error }) => {
        if (loading) return <TableContentsLoading />;
        if (error) return <div>Error {JSON.stringify(error)}</div>;

        const { allPosts } = data

        if (allPosts.length === 0) {
          return <NoDataFound />
        }

        return (
          <div>
            <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th className="c-table-cell u-w100"><abbr title="Title">Title</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="MdContents">Markdown Contents</abbr></th>
                  <th className="c-table-cell u-w200"><abbr title="Category">Category</abbr></th>
                  <th className="c-table-cell u-w50"><abbr title="Hero">Heros</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Photos">Photos</abbr></th>
                  <th className="c-table-cell u-w200"><abbr title="Tags">Tags</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                {allPosts.map(post => (
                  <Post key={post.id} post={post} me={props.me} {...props} />
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
    componentName: 'Post',
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
      { id: 1, type: "title", name: "Title" },
    ],
    'title',
  ),
  withPagination(GET_POST_COUNT),
  hasLogger(false),
)(Posts)
