import _ from 'lodash'
import React from 'react'
import {
  compose,
  withProps,
  withState,
  withHandlers,
} from "recompose"

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps"

import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import { getInitialProps } from '../../utils/getGmapInitialProps'

const SimpleMap = (props) => {
  const { google } = window

  return (
    <GoogleMap
      defaultZoom={props.zoom}
      ref={props.onMapMounted}
      center={props.center}
      onZoomChanged={props.onZoomChanged}
      onClick={props.onClick}
      onBoundsChanged={props.onBoundsChanged}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          className="input is-primary"
          type="text"
          placeholder="Input the name of place where you want"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `60%`,
            marginTop: `15px`,
            marginRight: `15px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      {props.isMarkerShown && (
        <React.Fragment>
          <Marker position={{ lat: props.marker.lat, lng: props.marker.lng }} />
        </React.Fragment>
      )}
    </GoogleMap>
  )
}

export default compose(
  withProps({
    ...getInitialProps(process.env.REACT_APP_GOOGLE_API_KEY),
  }),
  withState('zoom', 'onZoomChange', 14),
  withState('marker', 'addMarker', ({ lat, lng }) => ({ lat, lng })),
  withState('bounds', 'setBounds', null),
  withState('center', 'setCenter', ({ lat, lng }) => ({ lat, lng })),
  withState('markers', 'setMarker', []),
  withHandlers(() => {
    const refs = {
      map: undefined,
      searchBox: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      // onBoundsChanged: ({ setBounds, setCenter }) => (e) => {
      //   setBounds(refs.map.getBounds())
      //   setCenter(refs.map.getCenter())
      // },
      onZoomChanged: ({ onZoomChange }) => () => {
        onZoomChange(refs.map.getZoom())
      },
      onClick: ({
        addMarker,
        setLatLng,
        setIsSelected
      }) => (e) => {
        addMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        })
        setLatLng({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        })
        setIsSelected()
      },
      onSearchBoxMounted: () => ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: ({ center, setMarker, setCenter }) => () => {
        const { google } = window
        const places = refs.searchBox.getPlaces();
        const bounds = new google.maps.LatLngBounds();

        places.forEach(place => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        });
        const nextMarkers = places.map(place => ({
          position: place.geometry.location,
        }));
        const nextCenter = _.get(nextMarkers, '0.position', center);

        setCenter({ lat: nextCenter.lat(), lng: nextCenter.lng() })
        setMarker(nextMarkers)
        // refs.map.fitBounds(bounds);
      },
    }
  }),
  withScriptjs,
  withGoogleMap
)(SimpleMap)
