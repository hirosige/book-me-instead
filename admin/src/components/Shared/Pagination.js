import React from 'react'
import { Query } from "react-apollo";
import PageInfo from './PageInfo';
import PaginationPlane from './PaginationPlane';

const Pagination = (props) => (
  <Query
    query={props.query}
    variables={props.variables}
    pollInterval={500}
  >
    {({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error {JSON.stringify(error)}</div>;

      const { count } = data._allCountriesMeta
      const lastPage = Math.ceil(count / props.recordPerPage)

      return (
        <React.Fragment>
          <PageInfo
            totalAmount={lastPage}
            current={props.currentPage}
            count={count}
            keyword={props.variables}
          />
          <PaginationPlane {...props} lastPage={lastPage} />
          {props.children}
          <PaginationPlane {...props} lastPage={lastPage} />
        </React.Fragment>
      )
    }}
  </Query>
)

export default Pagination