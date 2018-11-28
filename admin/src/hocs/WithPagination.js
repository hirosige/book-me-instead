import React from 'react'
import Pagination from '../components/Shared/Pagination'

const withPagination = pageQuery => WrappedComponent => {
  return class HOC extends React.Component {
    state = {
      currentPage: 1,
      recordPerPage: 10,
    }

    nextPage = () => {
      this.setState({ currentPage: this.state.currentPage + 1 })
    }

    movePage = (no) => {
      this.setState({ currentPage: no })
    }

    previousPage = () => {
      this.setState({ currentPage: this.state.currentPage - 1 })
    }

    render () {
      return (
        <React.Fragment>
          <Pagination
            nextPage={this.nextPage}
            movePage={this.movePage}
            previousPage={this.previousPage}
            query={pageQuery}
            variables={{
              searchFilter: this.props.searchCondition
            }}
            {...this.state}
          >
            <WrappedComponent {...this.props} {...this.state} />
          </Pagination>
        </React.Fragment>
      )
    }
  }
}

export default withPagination