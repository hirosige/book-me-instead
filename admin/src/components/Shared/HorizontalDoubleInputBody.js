import React from 'react'

const HorizontalDoubleInputBody = ({ columnName, children }) => (
  <div className="field is-horizontal">
    <div className="field-label is-normal">{columnName}</div>
    <div className="field-body">
      {children}
    </div>
  </div>
)

export default HorizontalDoubleInputBody