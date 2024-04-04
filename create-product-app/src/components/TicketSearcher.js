import React from 'react';

import {useIntl} from 'react-intl';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid, TextField} from '@material-ui/core';

import LiferayApi from '../common/services/liferay/api';


function TicketSearcher(props) {

 const intl = useIntl();

 const { carRegistrationNumber, idTrafficTicket } = props.store;

 function getTrafficTickets(cCarRegistrationNumber, cIdTrafficTicket){
    
    let filterData = "(carRegistrationNumber eq '" + cCarRegistrationNumber + "')"
      + " and (id eq '" + cIdTrafficTicket + "')";

    LiferayApi("o/c/traffictickets?filter="+filterData)
    .then((result) => {
        console.log("Get Traffic Ticket Response");
        console.log(result.data);
        let cTrafficTicketList = mapTrafficTicketData(result.data.items);
        handleTrafficTicketList(cTrafficTicketList);
    })
    .catch(console.log)
  }

  function mapTrafficTicketData(data){
    let mappingList = [];
    for (let ckey in data){
        let opt = {};
        opt.id = data[ckey].id;
        opt.carRegistrationNumber = data[ckey].carRegistrationNumber;
        opt.dateCreated = data[ckey].dateCreated;
        opt.amount = data[ckey].amount;
        opt.discountForPrepayment = data[ckey].discountForPrepayment;
        opt.reasonForTrafficViolation = data[ckey].reasonForTrafficViolation;
        opt.trafficViolationAddress = data[ckey].trafficViolationAddress;
        mappingList.push(opt);
    } 
    return mappingList;
  }

  function handleTrafficTicketList(value) {
    props.dispatch({ type: 'TRAFFIC_TICKET_LIST', value });
  }

  function handleIdTrafficTicket(event) {
    let value = event.target.value;
    props.dispatch({ type: 'ID_TRAFFIC_TICKET', value });
    if (carRegistrationNumber && value) {
      getTrafficTickets(carRegistrationNumber, value);
    }
  }

  function handleCarRegistrationNumber(event) {
    let value = event.target.value;
    props.dispatch({ type: 'CAR_REGISTRATION_NUMBER', value });
    if (value && idTrafficTicket) {
      getTrafficTickets(value, idTrafficTicket);
    }
  }
  
  return (  
    <Box sx={{ mb: 2 }}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField label={intl.formatMessage({id: 'id-traffic-ticket'})}
                  fullWidth variant="outlined" required
                  onChange={handleIdTrafficTicket}
                  value={props.store.idTrafficTicket} 
                  />
                  {/* defaultValue='161262' */}
            </Grid>
            <Grid item xs={6}>
              <TextField label={intl.formatMessage({id: 'car-registration-number'})}
                fullWidth variant="outlined" required
                onChange={handleCarRegistrationNumber}
                value={props.store.carRegistrationNumber} 
                />
                {/* defaultValue='4536hjk' */}
            </Grid>
        </Grid>
      </Box>
    <div>
      <Button
            variant="contained"
            onClick={props.handleNext}
            sx={{ mt: 1, mr: 1 }}
            disabled={!carRegistrationNumber || !idTrafficTicket}
        >
          {intl.formatMessage({id: 'continue'})}
      </Button>
    </div>
  </Box>
  );
}

export default TicketSearcher;
