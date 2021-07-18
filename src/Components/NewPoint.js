import React from 'react'
import RoomIcon from '@material-ui/icons/Room';

function NewPoint({item,setPlace}) {


    function newPlace(){
        setPlace(item.name)
    }

    console.log(item)
    return (
        <div>
            <button className="btn btn-transparent" onClick={newPlace}> <img style={{width:"1.3em"}} src ={item?.icon}/> {item.name}</button>
             <RoomIcon 
             onClick={newPlace}/>
             <h6 className="text-success mx-3">
            {item?.vicinity} </h6>
        
        
        </div>
    )
}

export default NewPoint
