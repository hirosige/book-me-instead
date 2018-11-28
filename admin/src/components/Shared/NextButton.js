import React from 'react'

const NextButton = ({ current, lastPage, nextPage }) => {
  if (lastPage !== 0 && current !== lastPage) {
    return (
      <button
        className="pagination-next"
        onClick={nextPage}
        style={{ borderRadius: 0 }}
      >Next</button>
    )
  }
  return <button className="pagination-next" disabled style={{ borderRadius: 0 }}>This is the Last Page</button>
}

export default NextButton