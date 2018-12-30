import React from 'react'
import ContentLoader from "react-content-loader"

const TableContentsLoading = props => {
  const random = () => {
    const max = 350
    const min = 100

    return Math.floor(
      Math.random() * (max + 1 - min)
    ) + min
  }

  return (
    <ContentLoader
      height={30}
      speed={1}
      primaryColor="#dbdaea"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="1" ry="1" width={random()} height="10" />
      <rect x="0" y="20" rx="1" ry="1" width={random()} height="10" />
    </ContentLoader>
  )
}

export default TableContentsLoading
