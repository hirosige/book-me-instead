import React from 'react'

const ToolBox = props => {
  return (
    <div style={{
      background: "rgb(136, 225, 239)",
      color: "#ffffff",
      fontSize: "1.2rem",
      height: "45.5px",
      padding: "6px",
    }}>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToolBox
