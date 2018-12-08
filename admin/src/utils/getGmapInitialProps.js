import React from 'react'

const makeEndpoint = apiKey => {
  const BASE_URL = 'https://maps.googleapis.com/maps/api/js'
  const GOOGLE_API_KEY = apiKey
  const API_VERSION = '3.exp'
  const LIBRARIES = 'geometry,drawing,places'
  const ENDPOINT =
    `${BASE_URL}?key=${GOOGLE_API_KEY}&v=${API_VERSION}&libraries=${LIBRARIES}`

  return ENDPOINT
}

const getInitialProps = apiKey => {
  return {
    googleMapURL: makeEndpoint(apiKey),
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 41.8507300, lng: -87.6512600 },
  }
}

export {
  getInitialProps
}
