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
import Review from './Review';
import withPagination from '../../hocs/WithPagination';
import {
  GET_REVIEWS,
  GET_REVIEW_COUNT
} from '../../queries/Review'
import NoDataFound from '../Shared/NoDataFound';
import withOneDayTodo from '../../hocs/WithOneDayTodo';
import withMessageable from '../../hocs/WithMessageable'
import ToolBox from '../Shared/ToolBox';
import ReadMoreButton from '../Shared/ReadMoreButton';
import ReviewTableLoading from './ReviewTableLoading';

const Reviews = (props) => (
  <div className=".l-main__content">
    <ToolBox>
      TOOL BOX
    </ToolBox>
    <Query
      query={GET_REVIEWS}
      variables={{
        first: props.recordPerPage,
        skip: (props.currentPage - 1) * props.recordPerPage,
        searchFilter: props.searchCondition,
      }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <ReviewTableLoading />
        if (error) return <div>Error {JSON.stringify(error)}</div>;

        const { allReviews } = data

        if (allReviews.length === 0) {
          return <NoDataFound />
        }

        return (
          <div>
            <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th className="c-table-cell u-w100"><abbr title="Rating">Rating</abbr></th>
                  <th className="c-table-cell u-w200"><abbr title="Description">Description</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Reviewer">Reviewer</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Hotel">Target Hotel</abbr></th>
                  <th className="c-table-cell u-w100"><abbr title="Controls">Controls</abbr></th>
                </tr>
              </thead>
              <tbody>
                {allReviews.map(review => (
                  <Review
                    key={review.id}
                    review={review}
                    indexQuery={GET_REVIEWS}
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
              modelName={`allReviews`}
              modelData={allReviews}
            />
          </div>
        )
      }}
    </Query>
  </div>
)

export default compose(
  defaultProps({
    componentName: 'Review',
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
      { id: 1, type: "rating", name: "Rating" },
    ],
    'rating',
  ),
  withPagination(GET_REVIEW_COUNT),
  hasLogger(false),
)(Reviews)
