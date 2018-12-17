import React from 'react'
import Pagination from '../components/Shared/Pagination'

const withPagination = (pageQuery, filterOption) => WrappedComponent => {
  return class HOC extends React.Component {
    state = {
      currentPage: 1,
      recordPerPage: 5,
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

    changeRecordPerPage= e => {
      this.setState({ recordPerPage: parseInt(e.target.value) })
    }

    render () {
      return (
        <React.Fragment>
          <Pagination
            nextPage={this.nextPage}
            movePage={this.movePage}
            previousPage={this.previousPage}
            changeRecordPerPage={this.changeRecordPerPage}
            query={pageQuery}
            variables={{
              searchFilter: {
                ...this.props.searchCondition,
                ...filterOption,
              }
            }}
            {...this.state}
          >
            <WrappedComponent
              {...this.props}
              {...this.state}
            />
          </Pagination>
        </React.Fragment>
      )
    }
  }
}

export default withPagination