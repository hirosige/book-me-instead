import React from 'react'

const ReadMoreButton = ({ fetchMore, modelName, modelData }) => {
  return (
    <button
      className="button is-primary u-no-br"
      style={{ margin: 10 }}
      onClick={() =>
        fetchMore({
          variables: {
            skip: modelData.length
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              [modelName]: [...prev[modelName], ...fetchMoreResult[modelName]]
            });
          }
        })
      }
    >
      READ MORE
    </button>
  )
}

export default ReadMoreButton
