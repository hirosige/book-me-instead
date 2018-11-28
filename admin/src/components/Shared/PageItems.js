import React from 'react'
import PageItem from './PageItem';

const PageItems = ({ lastPage, current, movePage }) => (
  <ul className="pagination-list">
    {[...Array(lastPage)].map((_, i) => {
      const pageNo = i + 1

      if (pageNo === current) {
        return (
          <PageItem
            isActive={true}
            key={i}
            pageNo={pageNo}
            movePage={movePage} />
        )
      } else {
        return (
          <PageItem
            isActive={false}
            key={i}
            pageNo={pageNo}
            movePage={movePage} />
        )
      }
    })}
  </ul>
)

export default PageItems