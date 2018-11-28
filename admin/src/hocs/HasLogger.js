import React from 'react'
import JSONPretty from 'react-json-pretty'

const addZeroFormat = (num) => {
  return (`0${num}`).slice(-2)
}

const getFormattedDate = (date) => {
  let year   = addZeroFormat(date.getFullYear())
  let month  = addZeroFormat(date.getMonth() + 1)
  let day    = addZeroFormat(date.getDate())
  let hour   = addZeroFormat(date.getHours())
  let min    = addZeroFormat(date.getMinutes())
  let second = addZeroFormat(date.getSeconds())

  return `${year}-${month}-${day} ${hour}:${min}:${second}`
}

const hasLogger = showFlg => WrappedComponent => {
  const HasLogger = props => {
    if (!showFlg) {
      return <WrappedComponent {...props} />
    }

    const logMsg = `%cDEBUG%c ${getFormattedDate(new Date())} [${props.componentName}] [${props.transactionType}]`
    console.log(logMsg, 'color: red; font-weight: bold;', '', props)
    return (
      <React.Fragment>
        <WrappedComponent {...props} />
        <hr style={{ margin: 0, padding: 0, background: "#ffffff" }} />
        <div style={{ padding: "10px", background: "#444444", color: "#ffffff" }}>
          <h2>Debug Props</h2>
          <JSONPretty id="json-pretty" json={JSON.stringify(props)}></JSONPretty>
        </div>
      </React.Fragment>
    )
  }

  return HasLogger
}

export default hasLogger