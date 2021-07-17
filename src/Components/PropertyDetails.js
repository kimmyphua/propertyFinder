import axios from 'axios'
import React, {useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {GoogleMap, Marker} from "react-google-maps";
import * as historical_data from '../data/historical_data.json'


function PropertyDetails({location,details,mrt}) {
  

    return (
        <div>
       
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
            <h5><img style={{width:"1.3em"}} src ={item?.icon}/> 
            {item?.name} 
            
            {item.photos ? <span className="fw-light "><a href={item.photos[0]?.html_attributions[0].split('"')[1]} target="_blank"> Map </a></span> : ""} </h5>              

            <h6 className="text-success">
            {item?.vicinity} </h6>
            </p>
            ))}
           
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
