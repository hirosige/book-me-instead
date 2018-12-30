import React from 'react'
import { Query } from "react-apollo";
import PageInfo from './PageInfo';

const Pagination = (props) => (
  <Query
    query={props.query}
    variables={props.variables}
  >
    {({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error {JSON.stringify(error)}</div>;

      const { count } = Object.entries(data)[0][1]
      const lastPage = Math.ceil(count / props.recordPerPage)

      return (
        <React.Fragment>
          <PageInfo
            totalAmount={lastPage}
            current={props.currentPage}
            count={count}
            keyword={props.variables}
          />
          {props.children}
          {/* <PaginationPlane {...props} lastPage={lastPage} /> */}
        </React.Fragment>
      )
    }}
  </Query>
)

export default Pagination