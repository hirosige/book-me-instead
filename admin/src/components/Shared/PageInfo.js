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
              <div>{
                `${ // convert str, ex) name_contains => Name Contains
                    Object.keys(keyword.searchFilter)[0]
                      .split('_')
                      .map(item => {
                        if (item === "gt") return "Greater Than"
                        if (item === "gte") return "Greater Than And Equal"
                        if (item === "lt") return "Less Than"
                        if (item === "lte") return "Less Than And Equal"
                        return item.charAt(0).toUpperCase() + item.slice(1)
                      })
                      .join(' ')
                  } "${Object.entries(keyword.searchFilter)[0][1]}"`
              }</div>
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