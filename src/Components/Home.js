import {
    Button,
    Container
} from 'react-bootstrap'
import React, {
    useState
} from 'react'
import PropertyView from './PropertyView'
import * as property from '../data/property_listings.json'



function Home() {
    const [keyword, setKeyword] = useState("")
    const [list, setList] = useState([])

    async function getList() {
        setList([])
        let filtered = await property.default.filter(p => p.address.toLowerCase().includes(keyword.toLowerCase()))
        if (filtered.length > 0) {
            setList(filtered)
            console.log("ok")
        } else {
            setList([])
            alert("no data found! please try another word")
            console.log("no data found! please try another word")
        }

    }


    // console.log(list)

    return ( 
    <Container fluid>
        Search
        for a property <input type = "text"
        onChange = {(e) => {setKeyword(e.target.value)}
        }/> 
        <Button onClick = {getList} > Submit </Button>

        {list?.map((item, i) => ( 
                <div>
                <PropertyView 
                item = {item}
                i = {i}/>

                </div>
            ))
        }


        </Container>
    )
}

export default Home