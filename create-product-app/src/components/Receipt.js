import React from 'react';

import {useIntl} from 'react-intl';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReportTemplate from './ReportTemplate';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import { Grid } from '@material-ui/core';

import support_agent from './../icons/support_agent.png';

import ic_thumb_up_128_28824 from './../icons/ic_thumb_up_128_28824.png';

function Receipt(props) {

  const intl = useIntl();

  const reportTemplateRef = useRef(null);

  const { trafficTicketList, amount } = props.store;

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'px',
    });

    // Adding the fonts.
    doc.setFont('Inter-Regular', 'normal');

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save('traffic_ticket_receipt');
      },
    });
  };

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
              onClick={props.handleReset}
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
    <Box sx={{ mb: 2 }}> 
      <Box sx={{ p: 2, alignItems: 'center' }}>
        <Grid container spacing={2}>
          <Grid item >
            <Box sx={{ p: 1}}>
              <img src={ic_thumb_up_128_28824} alt='' width="70px" align="bottom" style={{ color: "white" }} />
            </Box>
          </Grid>
          <Grid item >
            <Box sx={{ pt: 4}}>
              <Typography variant="h5" gutterBottom>
                {intl.formatMessage({id: 'pay-status-ok'})}
              </Typography>
            </Box>
          </Grid> 
        </Grid>
      </Box>
      <div>
        <Button
            variant="contained"
            onClick={props.handleReset}
            sx={{ mt: 1, mr: 1 }}
          >
          {intl.formatMessage({id: 'search-again'})}
        </Button>
        <Button
            variant="contained"
            disabled={false}
            onClick={handleGeneratePdf}
            sx={{ mt: 1, mr: 1 }}
            target="_blank"
            color="success"
          >
          {intl.formatMessage({id: 'download-procedure-receipt'})}
        </Button>
        <Box sx={{ display: 'none' }}>
          <div ref={reportTemplateRef}>
            <ReportTemplate store={props.store}/>
          </div>
        </Box>
      </div>
    </Box>
  );
}

export default Receipt;
