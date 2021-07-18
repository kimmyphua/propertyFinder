
import React, {useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import {GoogleMap, Marker} from "react-google-maps";
import * as historical_data from '../data/historical_data.json'
import NewPoint from './NewPoint';


function PropertyDetails({item,location,details,mrt}) {
    const [place, setPlace]= useState(item.address)



    return (
        <div>
       <Row>
           <Col md={6}>
           <div style={{
          maxHeight: "500px",
          backgroundColor: "lightyellow",
          overflow: "scroll",
          border: "1px solid black"
        }}>
            <p className="border border-dark p-1 m-1">
                Nearest MRT stations: 
            <span> {mrt[0]?.name}, </span> 
            <span> {mrt[1]?.name}, </span>
            <span> {mrt[2]?.name}, </span>
            <span> {mrt[3]?.name}, </span>
            <span> {mrt[4]?.name}</span>
            
            </p>

            <p className="border border-dark p-1 m-1 ">
                
            <span><img style={{width:"1.3em"}} src ="https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png"></img> Generic Business</span>
            <span><img style={{width:"1.3em"}} src ="https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png"></img> School </span>
            <span><img style={{width:"1.3em"}} src ="https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png"></img> Shops </span>
            <span><img style={{width:"1.3em"}} src ="https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png"></img> Cafe </span>
            <span><img style={{width:"1.3em"}} src ="https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png"></img> Restaurant </span>
            <span><img style={{width:"1.3em"}} src ="https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/pharmacy-71.png"></img>Pharmacy</span>
            </p>
       


            {details?.map((item,i) => (
                <p key={i} className="text-start">
            <h5> <NewPoint 
            item={item}
            setPlace={setPlace}/> </h5>              

            </p>
            ))}
            </div>
           </Col>
           <Col md={6}>
           <iframe
                style={{
                    width:"100%",
                    height:"100%"
                }}
                loading="lazy"
                allowfullscreen
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_KEY}&q=${place}`} />
            
            </Col>
            </Row>




    <GoogleMap>



    {location?.map((item,i) => (
    <Marker
    key={i}
    position={{
        lat: Number(item?.geometry?.location.lat),
        lng: Number(item?.geometry?.location.lng)
    }}
    onClick={() => {
        alert(`Name: ${item.formatted_address}`);
    }}
    onDblClick={GoogleMap.defaultProps = {
        center: {
            lat: Number(item?.geometry?.location.lat),
            lng: Number(item?.geometry?.location.lng)
        },
        zoom: 15,
    }}
    icon={{
        url: "https://img.icons8.com/plasticine/2x/marker.png",
        scaledSize: new window.google.maps.Size(40, 40)
    }}/>
    ))}



    </GoogleMap>




        </div>
    )
}

export default PropertyDetails
