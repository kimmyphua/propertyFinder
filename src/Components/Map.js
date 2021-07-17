import React from 'react'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
  } from "react-google-maps";
  import mapStyles from "../styles/mapStyles";


function Map() {

    function MapContainer() {
    return (
        <div>
            <GoogleMap    
                    defaultZoom={10}
                    defaultCenter={{lat: 1.3789, lng: 103.8536}}
                    defaultOptions={{styles: mapStyles}}>
              </GoogleMap>
        </div>
    )
}
const MapWrapped = withScriptjs(withGoogleMap(MapContainer));
    return (
        <div style={{width: "auto", height: "300px"}}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100%`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
        </div>
    );
}

export default Map
