import React from 'react'

const NoDataFound = () => (
  <article className="message is-warning" style={{ borderRadius: 0, margin: 0 }}>
    <div className="message-header" style={{ borderRadius: 0 }}>
      <p>Opps, Data Not Found</p>
    </div>
    <div className="message-body">
      Try Other Condition in Search Box
    </div>
  </article>
)

export default NoDataFound