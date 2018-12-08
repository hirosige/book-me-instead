import axios from 'axios'

export default async event => {
  const {
    lat,
    lng,
    radius,
    type,
    keyword,
  } = event.data

  const BASE_URL = 'https://maps.googleapis.com/maps/api/'
  const MODULE = 'place/nearbysearch/json'
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

  const ENDPOINT =
    `${BASE_URL}${MODULE}?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`


  const fetchedPlaces = await axios.get(ENDPOINT)
    .then(response => {
      return response.data.results
    }).catch(error => {
      return { error: error }
    })

  if('error' in fetchedPlaces) {
    return {
      error: fetchedPlaces.error
    }
  }

  let places = []

  fetchedPlaces.forEach(place => {
    places.push({
      ...place,
      placeId: place.place_id,
      plusCode: place.plus_code,
      openingHours: place.opening_hours,
    })
  })

  event.data = places

  return {
    data: event.data
  }
}