import './App.css';

import {useIntl} from 'react-intl';
import useStore from './global/useStore';
import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import TicketSearcher from './components/TicketSearcher';
import TicketDataConfirmation from './components/TicketDataConfirmation';
import PaymentForm from './components/PaymentForm';
import PaymentConfirmation from './components/PaymentConfirmation';
import Receipt from './components/Receipt';

function App() {

  const intl = useIntl();
  const [store, dispatch] = useStore();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: intl.formatMessage({id: 'machine-data'}),
      description: intl.formatMessage({id: 'machine-data-description'})
    },
    {
      label: intl.formatMessage({id: 'traffic-ticket-confirmation'}),
      description: intl.formatMessage({id: 'traffic-ticket-confirmation-description'})
    },
    {
      label: intl.formatMessage({id: 'vendor-form'}),
      description: intl.formatMessage({id: 'vendor-form-description'})
    },
    {
      label: intl.formatMessage({id: 'payment-confirmation'}),
      description: intl.formatMessage({id: 'payment-confirmation-description'})
    },
    {
      label: intl.formatMessage({id: 'final-receipt'}),
      description: intl.formatMessage({id: 'final-receipt-description'})
    }
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    dispatch({ type: 'RESET' });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
                <TicketSearcher 
                    handleNext={handleNext}
                    dispatch={dispatch} 
                    store={store}
                />
              );
      case 1:
        return (
                <TicketDataConfirmation
                  handleNext={handleNext}
                  handleBack={handleBack}
                  dispatch={dispatch} 
                  store={store}
                />
               );
      case 2:
        return (
                <PaymentForm
                  handleNext={handleNext}
                  handleBack={handleBack}
                  handleReset={handleReset}
                  dispatch={dispatch} 
                  store={store}
                />
               );
      case 3:
        return (
                <PaymentConfirmation
                  handleNext={handleNext}
                  handleBack={handleBack}
                  handleReset={handleReset}
                  dispatch={dispatch} 
                  store={store}
                />
                );
      case 4:
        return (
                <Receipt
                  handleReset={handleReset}
                  handleBack={handleBack}
                  dispatch={dispatch} 
                  store={store}
                />
                );              
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Box sx={{ p:4 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
                optional={
                  index === 4 ? (
                    <Typography variant="caption">{intl.formatMessage({id: 'last-step-description'})}</Typography>
                  ) : null
                }
            >
                {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {getStepContent(activeStep)}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default App;
