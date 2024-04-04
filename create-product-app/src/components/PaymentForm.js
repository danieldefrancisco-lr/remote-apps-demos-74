import React from 'react';

import {useIntl} from 'react-intl';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Icon from '@mui/material/Icon';

import amex from './../cards/amex.png';
import cirrus from './../cards/cirrus.png';
import diners from './../cards/diners.png';
import dankort from './../cards/dankort.png';
import discover from './../cards/discover.png';
import jcb from './../cards/jcb.png';
import maestro from './../cards/maestro.png';
import mastercard from './../cards/mastercard.png';
import visa from './../cards/visa.png';
import visaelectron from './../cards/visaelectron.png';

import {
  TextField,
  Grid
} from "@material-ui/core";

function PaymentForm(props) {

  const intl = useIntl();

  const {trafficTicketList, amount, creditCardNumber, expirationDate, cvc} = props.store;

  function handleCreditCardNumber(event) {
    let value = event.target.value;
    props.dispatch({ type: 'CREDIT_CARD_NUMBER', value });
  } 

  function handleExpirationDate(event) {
    let value = event.target.value;
    props.dispatch({ type: 'EXPIRATION_DATE', value });
  } 

  function handleCvc(event) {
    let value = event.target.value;
    props.dispatch({ type: 'CVC', value });
  } 

  if (!trafficTicketList || trafficTicketList.length <= 0 || !amount) {
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
                  <Icon color="primary" sx={{ fontSize: '4rem' }}>support_agent</Icon>
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

  return ( 
     
    <Box sx={{ pt: 4 }}>
      <Grid container item xs={12} spacing={3} justifyContent="space-between">
            <Grid item xs={12} sm={3}>
                <Typography variant="h6">Payment Data</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
                <img src={amex} alt="logo" width="50px" align="bottom" style={{ padding: "0 5px" }} />
                <img src={cirrus} alt="logo" width="50px" align="bottom" style={{ padding: "0 5px" }} />
                <img src={diners} alt="logo" width="50px" align="bottom" style={{ padding: "0 5px" }} />
                <img src={dankort} alt="logo" width="50px" align="bottom" style={{ padding: "0 5px" }} />
                <img src={discover} alt="logo" width="50px" align="bottom" style={{ padding: "0 5px" }} />
                <img src={jcb} alt="logo" width="50px" align="bottom" style={{ padding: "0 5px" }} />
                <img src={maestro} alt="logo" width="50px" align="bottom" style={{ padding: "0 5px" }} />
                <img src={mastercard} alt="logo" width="50px" align="bottom" style={{ padding: "0 5px" }} />
                <img src={visa} alt="logo" width="50px" align="bottom" style={{ padding: "0 5px" }} />
                <img src={visaelectron} alt="logo" width="50px" align="bottom" style={{ padding: "0 5px" }} />
            </Grid>
      </Grid>
      <Box sx={{ pt: 4 }}>
        <Grid container item xs={12} spacing={3} >
          <Grid item xs={3} sm={3}>
            <TextField label={intl.formatMessage({id: 'amount'})}
              disabled fullWidth variant="outlined" required 
              value={props.store.amount}    
            />
          </Grid>
          <Grid item xs={9} sm={9}>
            <TextField label={intl.formatMessage({id: 'credit-card-number'})}
              fullWidth variant="outlined" required 
              onChange={handleCreditCardNumber}
              value={props.store.creditCardNumber}    
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ pb: 4 }}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={6} sm={6}>
            <TextField label={intl.formatMessage({id: 'expiration-date'})}
              fullWidth variant="outlined" required
              onChange={handleExpirationDate}
              value={props.store.expirationDate}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField label={intl.formatMessage({id: 'cvc'})}
              fullWidth variant="outlined" required
              onChange={handleCvc}
              value={props.store.cvc}
            />
          </Grid>
        </Grid>
      </Box>
      <Button
            variant="contained"
            onClick={props.handleNext}
            sx={{ mt: 1, mr: 1 }}
            disabled={!amount || !creditCardNumber || !expirationDate || !cvc}
        >
          {intl.formatMessage({id: 'continue'})}
      </Button>
      
      <Button
            disabled={false}
            onClick={props.handleBack}
            sx={{ mt: 1, mr: 1 }}
        >
          {intl.formatMessage({id: 'back'})}
      </Button>

  </Box>
  );
}

export default PaymentForm;
