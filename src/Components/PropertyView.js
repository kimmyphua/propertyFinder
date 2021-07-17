import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import PropertyDetails from './PropertyDetails';
import {Col, Row} from 'react-bootstrap'
import Map from './Map';
import * as historical_data from '../data/historical_data.json'
import Menu from './Menu'


const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.5)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 5px',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function PropertyView({item, i}) {

  const [expanded, setExpanded] = useState('panel1');
  
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  
  };

    let data = historical_data.default.filter(e => e.type.includes(item.rooms))
    let results = data[0]?.data


 
  return (
    <div>
       <Col md={12}>
      <Accordion square expanded={expanded === `panel${i+1}`} onChange={handleChange(`panel${i+1}`)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{item?.rooms} in {item?.address} <text style={{fontSize: "13px", marginLeft: "5px", color: "grey"}}>click to expand</text></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Row className="justify-content-between">
            <Col md={6}>
              <Row >
              <h5 className="text-danger mx-3"> {item?.rooms} in {item?.address}</h5>
              <Col md={6}>
              <h4> {item.price} </h4>
              <h6> {item.price_psf}</h6>
              <Row>
             
              </Row>
              </Col>
              <Col md={6}>
              <h5> {item.sqf_list} </h5>
              <h6>{item?.bedrooms} Beds {item?.bathrooms} Baths</h6>
              </Col>
               <iframe
               style={{width:"600px",
               height:"350px"}}
              loading="lazy"
              allowfullscreen
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_KEY}&q=${item.address}`} />
            
              
             
              </Row>
               

               
            </Col>
            <Col md={6}>
          <Menu item={item} results={results}/>
          
       
         </Col>
      </Row>
          </Typography>
        </AccordionDetails>
      </Accordion>
  

  
         </Col>
    </div>
  );
}

