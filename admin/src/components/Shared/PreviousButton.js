import React from 'react'

const PreviousButton = ({ current, previousPage }) => {
  if (current > 1) {
    return (
      <button
        className="pagination-previous"
        onClick={previousPage}
        style={{ borderRadius: 0 }}
      >Previous</button>
    )
  }
  return <button className="pagination-previous" disabled style={{ borderRadius: 0 }}>This is the First Page</button>
}

export default PreviousButton