import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {Col, Row} from 'react-bootstrap'
import * as historical_data from '../data/historical_data.json'
import Menu from './Menu'


const Accordion = withStyles({
  root: {
   
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fefbd8',
  
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: '#d5f4e6',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
      backgroundColor: '#80ced6',
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 5px',
      maxWidth: "100%",
      overflow: "scroll"
      
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
       
      <Accordion square expanded={expanded === `panel${i+1}`} onChange={handleChange(`panel${i+1}`)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography 
          className="typography-text"
        
          >
            {i+1}. {item?.rooms} in {item?.address} <text style={{fontSize: "13px", marginLeft: "5px", color: "grey"}}>click to expand</text></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            
            
            <Menu 
            item={item} results={results}/>
         
          </Typography>
        </AccordionDetails>
      </Accordion>
  
    </div>
  );
}

