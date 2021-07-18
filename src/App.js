import './App.css';
import React, {useState} from 'react';
import Home from './Components/Home';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker
} from "react-google-maps";
import mapStyles from "./styles/mapStyles";
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import {
    Col,
    Container,
    Navbar,
} from "react-bootstrap";
import * as mrt from '../src/data/mrtsg.json'



function App() {
    
    function Map() {
       
        return ( 
            <div className="container-body">
            <Container fluid>
            
            
            
            <GoogleMap defaultZoom = {11}
            defaultCenter = {{
                    lat: 1.354833,
                    lng: 103.831833
                }}
            defaultOptions = {{styles: mapStyles}}>

            {mrt.default.map((station, i)=>(
            <Marker key = {i}
            position = {{
                    lat: station.Latitude,
                    lng: station.Longitude
                }}
                onClick={()=>{
                   alert(`${station.STN_NAME} ${station.STN_NO}`)
                }}
                onDblClick={()=> GoogleMap.defaultProps = {
                    center: {
                        lat: station.Latitude,
                        lng: station.Longitude
                    },
                    zoom: 15,
                }}
                icon = {{
                    url: "https://img.icons8.com/bubbles/2x/train.png",
                    scaledSize: new window.google.maps.Size(35, 35)
                }}
            />
            ))}
            </GoogleMap>
       

            <BrowserRouter >
                <Container fluid >
                
                     <Switch>

                        <Route path = "/" exact >
                            <Home />
                        </Route>

                     </Switch> 
                </Container> 
            </BrowserRouter>

            
            

            
            </Container>
            </div>
        );
    }

    const MapWrapped = withScriptjs(withGoogleMap(Map));



    return (
        <div style={{width: "auto", height: "200px"}}>

       
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100%`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />

        {/* // : <MapWrapped
        //         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
        //             process.env.REACT_APP_GOOGLE_KEY}`}
        //         loadingElement={<div style={{height: `100%`}}/>}
        //         containerElement={<div style={{height: `100%`}}/>}
        //         mapElement={<div style={{height: `0%`}}/>}
        //     />} */}
        </div>
    );
}

export default App;