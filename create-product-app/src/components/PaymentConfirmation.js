import React from 'react';

import {useIntl} from 'react-intl';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Grid, TextField} from '@material-ui/core';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function PaymentConfirmation(props) {

  const intl = useIntl();
  const [open, setOpen] = React.useState(false);

  const { trafficTicketList, amount } = props.store;

  const handleClose = () => {
  setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
    setTimeout(() => {
      handleClose();
      props.handleNext();
    }, 5000);
    
  };

  if (!trafficTicketList || trafficTicketList.length <= 0 || !amount) {
    return (
      <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              onClick={props.handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              Continue
            </Button>
            <Button
              disabled='false'
              onClick={props.handleBack}
              sx={{ mt: 1, mr: 1 }}
            >
              Back
            </Button>
          </div>
        </Box>      
    );
  }

  return (
    
    <Box sx={{ mb: 2 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({id: 'payment-confirmation'})}
        </Typography>
      </Box>
      <Divider>{intl.formatMessage({id: 'traffic-ticket-data'})}</Divider>
       {Object.entries(trafficTicketList).map(([key, obj], index) => { return (
          <Box pr={2} pb={2} pt={3} key={index}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                  <TextField label={intl.formatMessage({id: 'id'})}
                    fullWidth disabled variant="standard"
                    value={obj.id} 
                    />
              </Grid>
              <Grid item xs={6}>
                  <TextField label={intl.formatMessage({id: 'car-registration-number'})}
                    fullWidth disabled variant="standard"
                    value={obj.carRegistrationNumber} 
                    />
              </Grid>
              <Grid item xs={6}>
                  <TextField label={intl.formatMessage({id: 'date-created'})}
                    fullWidth disabled variant="standard"
                    value={obj.dateCreated} 
                    />
              </Grid>
              <Grid item xs={6}>
                  <TextField label={intl.formatMessage({id: 'reason-for-traffic-violation'})}
                    fullWidth disabled variant="standard"
                    value={obj.reasonForTrafficViolation}
                    />
              </Grid>
              <Grid item xs={6}>
                <TextField label={intl.formatMessage({id: 'amount'})}
                  fullWidth disabled variant="standard"
                  value={obj.amount} 
                  />
              </Grid>
              <Grid item xs={6}>
                <TextField label={intl.formatMessage({id: 'discount-for-prepayment'})}
                  fullWidth disabled variant="standard"
                  value={obj.discountForPrepayment} 
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField label={intl.formatMessage({id: 'traffic-violation-address'})}
                  fullWidth disabled variant="standard"
                  value={obj.trafficViolationAddress}
                  />
              </Grid>
            </Grid>          
          </Box>

        )})}
        <Divider sx={{ pt: 4 }}>{intl.formatMessage({id: 'payment-data'})}</Divider>
        <Box sx={{ pt: 4 }}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={3} sm={3}>
              <TextField label="Amount"
                fullWidth disabled variant="standard"
                value={props.store.amount}    
              />
            </Grid>
            <Grid item xs={9} sm={9}>
              <TextField label="Credit Card Number"
                fullWidth disabled variant="standard"
                value={props.store.creditCardNumber}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ pb: 4 }}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={6} sm={6}>
              <TextField label="Expiration Date"
                fullWidth disabled variant="standard"
                value={props.store.expirationDate}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField label="CVC"
                fullWidth disabled variant="standard"
                value={props.store.cvc}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button
                  variant="contained"
                  onClick={handleToggle}
                  sx={{ mt: 1, mr: 1 }}
                  color="warning"
              >
                {intl.formatMessage({id: 'proceed-to-payment'})}
            </Button>
            <Button
                  disabled={false}
                  onClick={props.handleBack}
                  sx={{ mt: 1, mr: 1 }}
              >
                {intl.formatMessage({id: 'back'})}
            </Button>
          </div>
        </Box>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop> 
      </Box>      
  );
}

export default PaymentConfirmation;
