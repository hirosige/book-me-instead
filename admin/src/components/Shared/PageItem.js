import React from 'react'

const PageItem = ({ isActive, pageNo, movePage }) => (
  <React.Fragment>
    { isActive ? (
      <li>
        <button
          className="pagination-link is-current"
          aria-label={`Goto page ${pageNo}`}
          aria-current="page"
          style={{ borderRadius: 0 }}
        >{pageNo}</button></li>
    ) : (
      <li>
        <button
          className="pagination-link"
          aria-label={`Goto page ${pageNo}`}
          onClick={movePage.bind(this, pageNo)}
          style={{ borderRadius: 0 }}
        >{pageNo}</button></li>
    )}
  </React.Fragment>
)

export default PageItem