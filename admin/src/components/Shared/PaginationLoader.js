import React from 'react'
import ContentLoader from "react-content-loader"

const PaginationLoader = props => {
  return (
    <nav className="level" style={{ paddingTop: "15px" }}>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Total Records</p>
          <div className="title" style={{
            marginTop: 0,
            width: 140,
            height: 60
          }}>
            <ContentLoader
              speed={1}
              primaryColor="#dbdaea"
		          secondaryColor="#ecebeb"
              {...props}
            >
              <rect x="0" y="0" rx="1" ry="1" width="350" height="20" /> 
              <rect x="0" y="40" rx="1" ry="1" width="380" height="20" /> 
            </ContentLoader>
          </div>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <div className="heading">Current Search Keyword</div>
          <div className="title" style={{
            marginTop: 0,
            width: 140,
            height: 60
          }}>
            <ContentLoader
              speed={1}
              primaryColor="#dbdaea"
		          secondaryColor="#ecebeb"
              {...props}
            >
              <rect x="0" y="0" rx="1" ry="1" width="400" height="20" /> 
              <rect x="0" y="40" rx="1" ry="1" width="380" height="20" /> 
            </ContentLoader>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default PaginationLoader
