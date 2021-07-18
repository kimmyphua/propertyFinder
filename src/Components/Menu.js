import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropertyDetails from './PropertyDetails';
import HistoricalData from './HistoricalData';
import axios from 'axios';
import {Col, Row} from 'react-bootstrap'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#d5f4e6",
    width: '100%',
    overflow: 'scroll',
    border: '1px solid rgba(0, 0, 0, 0.6)',
  },
}));

export default function Menu({results,item}) {
    const [details, setDetails]=useState([])
    const [mrt, setMrt] = useState([])
    const [visible, setVisible] = useState(false)
    const [location, setLocation] = useState([])

    async function getDetails(){
        setDetails([])
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?countrycode=sg&address=${item.address}
        &key=${process.env.REACT_APP_GOOGLE_KEY}`).then(res => {
                setLocation(res.data.results)
            
             axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${res.data.results[0]?.geometry.location.lat},${res.data.results[0]?.geometry.location.lng}
             &rankby=distance&type=store&key=${process.env.REACT_APP_GOOGLE_KEY}`).then(res1 => {
              setDetails(res1.data.results)
        
                })
    
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${res.data.results[0]?.geometry.location.lat},${res.data.results[0]?.geometry.location.lng}
        &rankby=distance&type=subway_station&key=${process.env.REACT_APP_GOOGLE_KEY}`).then(res1 => {
         setMrt(res1.data.results)
    
           
        })
        
        })
        setVisible(!visible)
      
    }


  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getDetails()
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    getDetails()
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} 
          style={{backgroundColor: "#eca1a6"}}/>
          <Tab label="Nearby Amenities" {...a11yProps(1)} 
          style={{backgroundColor: "#bdcebe"}}/>
          <Tab label="Historical Transaction" {...a11yProps(2)} 
          style={{backgroundColor: "#d6cbd3"}}/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >


        <TabPanel value={value} index={0} dir={theme.direction}>
        <Row>
          <Col md={4}>
          
              <h3 className="text-danger mx-1"> {item?.rooms} in {item?.address}</h3>
              
              <h4> {item.price} </h4>
              <h6 className="my-3 text-muted"> {item.price_psf}</h6>
             
              <h5 className="my-3"> Size: {item.sqf_list} </h5>
              <h6>{item?.bedrooms} Beds {item?.bathrooms} Baths</h6>
  
             
              </Col>
              <Col md={8}>
              <iframe
                style={{width:"100%",
                height:"100%"}}
                loading="lazy"
                allowfullscreen
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_KEY}&q=${item.address}`} />
            </Col>
            </Row>
        </TabPanel>



        <TabPanel value={value} index={1} dir={theme.direction}>
     
        <PropertyDetails
        item={item} details={details} mrt={mrt} location={location} />
        
        </TabPanel>



        <TabPanel value={value} index={2} dir={theme.direction}>
        <HistoricalData results={results}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
