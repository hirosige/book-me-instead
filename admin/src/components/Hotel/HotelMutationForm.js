import React from 'react'
import { compose } from 'recompose'
import { Mutation, Query, graphql } from "react-apollo";
import HorizontalDoubleInputBody from '../Shared/HorizontalDoubleInputBody'
import HorizontalDoubleInputBox from '../Shared/HorizontalDoubleInputBox'
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame'
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'
import {
  GET_COUNTRIES,
  GET_AREAS_BY_COUNTRY,
} from '../../queries/Country'
import { ADD_TO_HOTEL_ADVANTAGE } from '../../queries/Hotel'
import Uploader from '../Upload/Uploader'
import MapModal from '../Map/MapModal'
import RoomMutationTable from './RoomMutationTable';
import AdvantageCheckboxTable from './AdvantageCheckboxTable';

const HotelMutationForm = props => (
  <React.Fragment>
    {props.hotel && (
      <Mutation
        mutation={props.mutation}
      >
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <form onSubmit={e => {
              e.preventDefault();

              const newRooms = props.hotel.rooms.map(room => {
                return {
                  name: room.name,
                  roomType: room.roomType,
                  price: parseInt(room.price),
                  people: parseInt(room.price),
                }
              })
              mutate({
                variables: {
                  ...props.hotel,
                  latitude: parseFloat(props.hotel.lat),
                  longitude: parseFloat(props.hotel.lng),
                  rooms: newRooms
                }
              }).then(result => {
                const { createHotel } = result.data

                props.hotel.advantages.forEach(advantage => {
                  props.addToHotelAdvantages({
                    variables: {
                      hotelsHotelId: createHotel.id,
                      advantagesAdvantageId: advantage
                    }
                  })
                })
                props.initializeState()
                props.makeCompleted()
              });

            }}>
              <header className="modal-card-head u-no-br u-bk-primary">
                <p className="modal-card-title u-txt-white">{props.title}</p>
                <div className="delete" aria-label="close" onClick={props.switchModal}></div>
              </header>
              {error && (
                <Danger message={error.message} />
              )}
              {props.isCompleted && (
                <Success
                  message={props.message}
                  closeCompleted={props.closeCompleted}
                />
              )}
              <section className="modal-card-body u-txt-gray" style={{
                height: "400px",
                overflow: "auto",
              }}>
                <HorizontalDoubleInputBody columnName="Hotel Name/Email">
                  <HorizontalDoubleInputBox>
                    <input
                      name="name"
                      className="input"
                      type="text"
                      placeholder="Name"
                      value={props.hotel.name}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                  <HorizontalDoubleInputBox>
                    <input
                      name="email"
                      className="input"
                      type="email"
                      placeholder="Email"
                      value={props.hotel.email}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                </HorizontalDoubleInputBody>
                <HorizontalDoubleInputBody columnName="Address/Appliances">
                  <HorizontalDoubleInputBox>
                    <textarea
                      name="address"
                      className="input u-h150"
                      type="text"
                      placeholder="Address"
                      value={props.hotel.address}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                  <HorizontalDoubleInputBox>
                    <textarea
                      name="appliances"
                      className="input u-h150"
                      type="text"
                      placeholder="Appliances"
                      value={props.hotel.appliances}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                </HorizontalDoubleInputBody>
                <HorizontalInputBoxFrame
                  columnName="Get Location"
                  notice="Please find hotel place to get latitude/longitude"
                >
                  <MapModal
                    title="FIND PLACE"
                    setLatLng={props.setLatLng}
                    lat={props.hotel.lat}
                    lng={props.hotel.lng}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalDoubleInputBody columnName="Latitude/Longitude">
                  <HorizontalDoubleInputBox>
                    <input
                      name="latitude"
                      className="input"
                      type="number"
                      step="any"
                      placeholder="Latitude"
                      value={props.hotel.lat}
                      onChange={props.handleChange}
                      readOnly
                    />
                  </HorizontalDoubleInputBox>
                  <HorizontalDoubleInputBox>
                    <input
                      name="longitude"
                      className="input"
                      type="number"
                      step="any"
                      placeholder="Longitude"
                      value={props.hotel.lng}
                      onChange={props.handleChange}
                      readOnly
                    />
                  </HorizontalDoubleInputBox>
                </HorizontalDoubleInputBody>
                <HorizontalDoubleInputBody columnName="Tel/Fax">
                  <HorizontalDoubleInputBox>
                    <input
                      name="tel"
                      className="input"
                      type="text"
                      placeholder="Tel"
                      value={props.hotel.tel}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                  <HorizontalDoubleInputBox>
                    <input
                      name="fax"
                      className="input"
                      type="text"
                      placeholder="Fax"
                      value={props.hotel.fax}
                      onChange={props.handleChange}
                    />
                  </HorizontalDoubleInputBox>
                </HorizontalDoubleInputBody>
                <HorizontalDoubleInputBody columnName="Country/Area">
                  <HorizontalDoubleInputBox>
                    <span className="select" style={{ borderRight: "2px solid rgb(181, 181, 181)", marginRight: "10px", paddingRight: "10px", }} >
                      <Query
                        query={GET_COUNTRIES}
                        variables={{
                          first: 100,
                          skip: 0,
                          searchFilter: {},
                        }}
                      >
                        {({ data, loading, error }) => {
                          if (loading) return 'loading'
                          if (error) return <div>Error {JSON.stringify(error)}</div>;

                          const { allCountries } = data

                          if (allCountries.length === 0) {
                            return 'no data'
                          }

                          return (
                            <React.Fragment>
                              <select className="u-no-br" name="countryId" onChange={props.handleChange} defaultValue={props.hotel.countryId}>
                                <option value="">Please select country</option>
                                {allCountries.map(country => (
                                  <option
                                    key={country.id}
                                    value={country.id}
                                  >{country.name}</option>
                                ))}
                              </select>
                            </React.Fragment>
                          )
                        }}
                      </Query>
                    </span>
                    {props.hotel.countryId ? (
                      <Query
                        query={GET_AREAS_BY_COUNTRY}
                        variables={{
                          id: props.hotel.countryId
                        }}
                      >
                        {({ data, loading, error }) => {
                          if (loading) return 'loading'
                          if (error) return <div>Error {JSON.stringify(error)}</div>;

                          const { Country } = data

                          if (Country.areas.length === 0) {
                            return (
                              <span className="tag is-danger is-medium" style={{ display: "inline-block", padding: "5px 10px" }}>
                                Any area not yet registered for this country
                              </span>
                            )
                          }

                          return (
                            <React.Fragment>
                              <span className="select">
                              <select className="u-no-br" name="areaId" onChange={props.handleChange} defaultValue={props.hotel.areaId}>
                                <option value="">Please select area</option>
                                {Country.areas.map(area => (
                                  <option
                                    key={area.id}
                                    value={area.id}
                                  >{area.name}</option>
                                ))}
                              </select>
                              </span>
                            </React.Fragment>
                          )
                        }}
                      </Query>
                    ) : (
                      <span className="tag is-danger is-medium" style={{ display: "inline-block", padding: "5px 10px" }}>
                        Country is not selected. please select country first
                      </span>
                    )}
                  </HorizontalDoubleInputBox>
                </HorizontalDoubleInputBody>
                <HorizontalInputBoxFrame columnName="Photos">
                  <Uploader
                    id='file'
                    name='content'
                    data-crop=""
                    data-clearable=""
                    value={props.photoValue}
                    data-multiple
                    onUploadComplete={info => props.handleChangePhoto(info)}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame columnName="Rooms">
                  <RoomMutationTable {...props} />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame columnName="Advantages">
                  <AdvantageCheckboxTable {...props} />
                </HorizontalInputBoxFrame>

                <div style={{ height: "10px" }} />
              </section>
              <footer className="modal-card-foot u-no-br">
                <button className="button is-success u-no-br" type="submit">SUBMIT</button>
                <div className="button u-no-br" onClick={props.switchModal}>CANCEL</div>
              </footer>
            </form>
          </React.Fragment>
        )}
      </Mutation>
    )}
  </React.Fragment>
)

export default compose(
  graphql(ADD_TO_HOTEL_ADVANTAGE, { name: "addToHotelAdvantages" }),
)(HotelMutationForm)
