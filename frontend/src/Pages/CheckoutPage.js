import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "styled-components";

const StyledBox = styled(Box)`
  margin: 1rem auto;
`;

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
    saveCard: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: newValue,
    }));
  };

  const handlePayment = () => {
    // Process payment logic here
    navigate.push("/confirmation"); // Redirect to confirmation page after successful payment
  };

  return (
    <StyledBox sx={{ p: 2, maxWidth: 400 }}>
      <Typography align="left" variant="h5" gutterBottom>
        Payment Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Card Number"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Card Holder"
            name="cardHolder"
            value={paymentInfo.cardHolder}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Expiration Date"
            name="expirationDate"
            value={paymentInfo.expirationDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="CVV"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="saveCard"
                checked={paymentInfo.saveCard}
                onChange={handleChange}
              />
            }
            label="Save card for future payments"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handlePayment}>
            Proceed to Pay
          </Button>
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export { CheckoutPage };
