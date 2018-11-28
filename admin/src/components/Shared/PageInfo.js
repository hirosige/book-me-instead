import React from 'react'

const PageInfo = ({ count, totalAmount, current, keyword }) => (
  <React.Fragment>
    <nav className="level" style={{ paddingTop: "15px" }}>
      <div className="level-item has-text-centered">
        <div>
          { Object.keys(keyword.searchFilter).length ? (
            <p className="heading">Total Search Hits</p>
          ) : (
            <p className="heading">Total Records</p>
          )}
          <p className="title" style={{ fontSize: "1rem" }}>{count}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Total Page Amount</p>
          <p className="title" style={{ fontSize: "1rem" }}>{totalAmount}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Current Page</p>
          <p className="title" style={{ fontSize: "1rem" }}>{current}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <div className="heading">Current Search Keyword</div>
          <div className="title" style={{ fontSize: "1rem" }}>
            { Object.keys(keyword.searchFilter).length ? (
              <div>SearchCondition: {JSON.stringify(keyword.searchFilter)}</div>
            ) : (
              <div>Nothing</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  </React.Fragment>
)

export default PageInfo