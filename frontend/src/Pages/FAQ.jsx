import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

const FAQ = ()=>{
  
  const questionAndAnswer  = [
    {
      q: 'How I can make an order',
      a: 'Majority of our standard cakes & sweets (including matcha powders) requires refrigeration, preferably at the range of 2-4°C. We recommend consuming the cake within 2 days, especially the ones decorated with fresh fruits.'
    },{
      q: 'How can I store my cakes?',
      a: 'Majority of our standard cakes & sweets (including matcha powders) requires refrigeration, preferably at the range of 2-4°C. We recommend consuming the cake within 2 days, especially the ones decorated with fresh fruits.'
    },{
      q: 'What is your cancellation policy?',
      a: 'Cancellations to standard cakes must be made in writing 48 hours prior to the said completion date to qualify for refund. Any notice made between 48-24 hours prior will only be qualified for a store credit (this can be used for all further orders). Any notice made within 24 hours prior will not be qualified for any refund or credit. '
    },{
      q: 'What is your returning policy?',
      a: 'We take pride in our cakes and sweets. On a few occasions a year we have an unsatisfied customer. If you are unhappy with your order and/or purchase, please notify the driver or staff before accepting the products. A staff shall then deal with your case ASAP. Once your order has been delivered or collected, we no longer hold any responsibility of your purchase. We highly recommend that all care be taken to ensure no damage or miss handling of the final product to ensure you receive exactly what you ordered.'
    },{
      q: 'Disclaimers',
      a: 'elf baking reserves the right to post photographs/ images of any of our work on our website and other social media sites (with the exception of images showing the faces of customers without their prior written permission)'
    },{
      q: 'last minute cake?',
      a: 'Please call our store  or email us to check immediate availability.'
    },{
      q: 'last minute cake?',
      a: 'Please call our store  or email us to check immediate availability.'
    },{
      q: 'last minute cake?',
      a: 'Please call our store  or email us to check immediate availability.'
    }
  ]

  return <Box p='1rem' >
    <Typography variant="h4" m='1rem'>Frequently Asked Questions</Typography>
    {
      questionAndAnswer.map((element, index)=>{
        return <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>{element.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{element.a}</Typography>
          </AccordionDetails>
        </Accordion>
      })
    }
  </Box>
}

export default FAQ;