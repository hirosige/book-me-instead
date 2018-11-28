import React from 'react'

const HorizontalInputBoxFrame = ({ columnName, children, notice }) => (
  <div className="field is-horizontal">
    <div className="field-label is-normal">{columnName}</div>
    <div className="field-body">
      <div className="field is-expanded">
        <div className="field has-addons">
          <p className="control is-expanded">
            {children}
          </p>
        </div>
        <p className="help">{notice}</p>
      </div>
    </div>
  </div>
)

export default HorizontalInputBoxFrame