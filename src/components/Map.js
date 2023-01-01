import React from 'react'
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import './Map.css'

const containerStyle = {
  width: '1360px',
  height: '650px',
  margin: 'auto',
  border: '1px solid #333333',
  bottom: '5px'
};

const center = {
  lat: 0,
  lng: 0
};

const options = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    minZoom: 3,
    maxZoom: 17
};

function Map() {
    const [map, setMap] = React.useState(/** @type google.maps.Map  */ (null))       
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDCdzSKDsuKcjUUh8DwL7lB_TOKWn6AHIc"
            libraries = {['places']}
        >
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
            options = {options}
            onLoad={map => setMap(map)}
        >
        <Autocomplete>
            <input
                type="text"
                placeholder="Enter a location"
                style={{
                    border: `1px solid black`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    color: '#333333',
                    fontFamily: 'Helvetica',
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "1.5%",
                    top: "2.5%",
                }}
            />
        </Autocomplete>
            <input
                type="button"
                value="↪"
                style={{
                    width: `32px`,
                    height: `34px`,
                    paddingTop: '3.5px',
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `15px`,
                    color: '#333333',
                    fontFamily: 'Helvetica',
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "21.5%",
                    top: "2.5%",
                }}
                onClick = {() => map.panTo(center)}
            />
          </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Map)