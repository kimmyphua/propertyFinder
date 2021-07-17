import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from 'react-bootstrap'

const useStyles = makeStyles({
  table: {
    maxWidth: 600,
  },
});



export default function HistoricalData({results}) {
  const classes = useStyles();
  
  console.log(results)
    return (
<>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
           
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Block</TableCell>
            <TableCell align="left">Area</TableCell>
            <TableCell align="left">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.map((row, i) => (
            <TableRow key={i}>
            
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.block}</TableCell>
              <TableCell align="left">{row.area}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 
    </>
  );
}

