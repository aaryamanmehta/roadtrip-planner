import React from 'react'
import { GoogleMap, LoadScript, StandaloneSearchBox, DirectionsRenderer } from '@react-google-maps/api';
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
    const [map, setMap] = React.useState(/** @type google.maps.Map */ (null))
    const [origin, setOrigin] = React.useState(null)
    const onOriginLoad = ref => {
        setOrigin(ref);
      };
    const [destination, setDestination] = React.useState(null)
    const onDestinationLoad = ref => {
        setDestination(ref);
    };
    const [directionsService, setDirectionsService] = React.useState(null) 
    const [distance, setDistance] = React.useState('')
    const [duration, setDuration] = React.useState('')
    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = React.useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = React.useRef()
    async function calculateRoute() {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
          return
        }
        const directionsService = new window.google.maps.DirectionsService()
        const results = await directionsService.route({
          origin: originRef.current.value,
          destination: destinationRef.current.value,
          travelMode: window.google.maps.TravelMode.DRIVING,
        })
        setDirectionsService(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

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
        {directionsService && <DirectionsRenderer directions={directionsService} />}  
        <StandaloneSearchBox
            onLoad={onOriginLoad}
        >
            <input
                type="text"
                placeholder="Enter your origin"
                ref={originRef}
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
        </StandaloneSearchBox>
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
                onClick = {() => map.panTo(origin.getPlaces()[0].geometry.location)}
            />
        <StandaloneSearchBox
            onLoad={onDestinationLoad}
        >
            <input
                type="text"
                placeholder="Enter your final destination"
                ref={destinationRef}
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
                    top: "9.5%",
                }}
            />
        </StandaloneSearchBox>
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
                    top: "9.5%",
                }}
                onClick = {() => map.panTo(destination.getPlaces()[0].geometry.location)}
            />
            <input
                type="button"
                value="Calculate Route"
                style={{
                    width: '267px',
                    height: `34px`,
                    paddingTop: '3.5px',
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `15px`,
                    color: '#333333',
                    fontFamily: 'Helvetica',
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "1.5%",
                    top: "16.5%",
                }}
                onClick = {function(event) { calculateRoute();}}
            />
            <div>
                <p style={{                
                    width: '247px',
                    height: `50px`,
                    padding: '9.5px',
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: `1px solid black`,
                    fontSize: `15px`,
                    color: '#333333',
                    fontFamily: 'Helvetica',
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "1.5%",
                    top: "22%",
                }}>Distance: {distance}</p>
                <p style={{
                    padding: '10.5px',
                    fontSize: `15px`,
                    color: '#333333',
                    fontFamily: 'Helvetica',
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "1.5%",
                    top: "26.7%",
                }}>Duration: {duration}</p>
            </div>
        </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Map)