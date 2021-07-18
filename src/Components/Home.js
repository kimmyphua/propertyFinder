import {
    Button,
    Container, Row,
    Nav, Navbar
} from 'react-bootstrap'
import React, {
    useState
} from 'react'
import PropertyView from './PropertyView'
import * as property from '../data/property_listings.json'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '29ch',
        backgroundColor: 'white'
      },
    },
  }));


function Home() {
    const [keyword, setKeyword] = useState("")
    const [list, setList] = useState([])
    const classes = useStyles();

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
        <Row className="justify-content-center my-1">

        <Navbar bg="white" expand="lg" className="w-100">

        <Navbar.Brand href="/">Property Finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-1">
                <Nav.Link href="/">Home</Nav.Link>
    
            </Nav>
        </Navbar.Collapse>
        <form className={classes.root} noValidate autoComplete="off">
      <TextField 
            id="outlined-basic" 
            label="Search Location or Address" 
            variant="outlined" 
            onChange = {(e) => {setKeyword(e.target.value)}
            }/>
        </form>
        <Button className="my-2 bg-white border-1 border-dark text-dark mx-2 button-class" onClick = {getList} > Submit </Button>

        </Navbar>
        
    
        </Row>
        

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