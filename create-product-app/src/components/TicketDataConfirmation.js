import React from 'react';

import {useIntl} from 'react-intl';

import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';

import support_agent from './../icons/support_agent.png';



function TicketDataConfirmation(props) {

  const intl = useIntl();

  const { trafficTicketList } = props.store;

  if (!trafficTicketList || trafficTicketList.length <= 0) {
    return (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              {intl.formatMessage({id: 'traffic-ticket-information'})}
            </Typography>
          </Box>
          <Box sx={{ p: 2, pl: 12 }}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ pt: 2}}>
                   <img src={support_agent} alt='' width="60px" align="bottom" />
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ pt: 3}}>
                  <Typography variant="body1" >
                    {intl.formatMessage({id: 'no-data-found'})}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ p: 2 }}>
            <Button
                  variant="contained"
                  disabled={false}
                  onClick={props.handleBack}
                  sx={{ mt: 1, mr: 1 }}
                  color="primary"
              >
                {intl.formatMessage({id: 'search-again'})}
            </Button>
          </Box>
        </Box>
      );
  }

  function setAmount(value) {
    props.store.amount = value;
  }

  return ( 
    <Box sx={{ mb: 2 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({id: 'traffic-ticket-confirmation'})}
        </Typography>
      </Box>
       {Object.entries(trafficTicketList).map(([key, obj], index) => { return (
          <Box pr={2} pb={2} key={index}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                  <TextField label={intl.formatMessage({id: 'id'})}
                    fullWidth disabled variant="filled"
                    value={obj.id} 
                    />
              </Grid>
              <Grid item xs={6}>
                  <TextField label={intl.formatMessage({id: 'car-registration-number'})}
                    fullWidth disabled variant="filled"
                    value={obj.carRegistrationNumber} 
                    />
              </Grid>
              <Grid item xs={6}>
                  <TextField label={intl.formatMessage({id: 'date-created'})}
                    fullWidth disabled variant="filled"
                    value={obj.dateCreated} 
                    />
              </Grid>
              <Grid item xs={6}>
                  <TextField label={intl.formatMessage({id: 'reason-for-traffic-violation'})}
                    fullWidth disabled variant="filled"
                    value={obj.reasonForTrafficViolation}
                    />
              </Grid>
              <Grid item xs={6}>
                <TextField label={intl.formatMessage({id: 'amount'})}
                  fullWidth disabled variant="filled"
                  value={obj.amount} 
                  />
                  {setAmount(obj.amount)}
              </Grid>
              <Grid item xs={6}>
                <TextField label={intl.formatMessage({id: 'discount-for-prepayment'})}
                  fullWidth disabled variant="filled"
                  value={obj.discountForPrepayment} 
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField label={intl.formatMessage({id: 'traffic-violation-address'})}
                  fullWidth disabled variant="filled"
                  value={obj.trafficViolationAddress}
                  />
              </Grid>
            </Grid>
          </Box>

        )})}
        <Box sx={{ p: 2 }}>
          <Button
              variant="contained"
              onClick={props.handleNext}
              sx={{ mt: 1, mr: 1 }} 
              color="primary"
              >
            {intl.formatMessage({id: 'confirm'})}
            </Button>
            <Button
                  disabled={false}
                  onClick={props.handleBack}
                  sx={{ mt: 1, mr: 1 }}
              >
                {intl.formatMessage({id: 'back'})}
            </Button>
        </Box> 
      </Box>
  );
}

export default TicketDataConfirmation;
