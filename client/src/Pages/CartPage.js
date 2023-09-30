import React from "react";
import { useGlobalConfigs } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  Grid,
  CardContent,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../utils/cartContext";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)``;

const StyledTypography = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledTotalTypography = styled(Typography)`
  && {
    font-weight: bold;
  }
`;

const StyledButton = styled(Button)`
  && {
    display: flex;
    align-items: center;
  }
`;
const StyledGrid = styled(Grid)`
  box-shadow: inset 0px -1px 1px #e5eaf2;
  padding: 1rem;
  margin: 1rem 0;
`;

const TotalPriceTypography = styled(Typography)`
  && {
    font-weight: bold;
  }
`;

const CheckoutTypography = styled(Typography)`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const CartPage = () => {
  const { cartItems, removeFromCart, removeAllFromCart, addToCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  return (
    <Box sx={{ p: 2, maxWidth: 1084 }}>
      <Typography align="left" variant="h5" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length > 0 ? (
        <>
          <StyledGrid container spacing={1}>
            {cartItems.map((item, index) => {
              return (
                <Grid item key={index} xs={12}>
                  <StyledCard sx={{ display: "flex", height: 150 }}>
                    <CardMedia
                      sx={{ width: 200, height: 150 }}
                      image={item.image_urls}
                      title={item.product_name}
                      component="img"
                    />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography align="left" variant="subtitle1">
                            Name: {item.product_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography align="left" variant="subtitle1">
                            Unit Price: ${item.price}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <StyledTypography align="left" variant="subtitle1">
                            <span>Quantity: </span>
                            <Button
                              size="small"
                              onClick={() => removeFromCart(item)}
                              style={{
                                maxWidth: "14px",
                                maxHeight: "14px",
                                minWidth: "14px",
                                minHeight: "14px",
                              }}
                              disabled={item.quantity === 1 && true}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              size="small"
                              onClick={() => addToCart(item)}
                              style={{
                                maxWidth: "14px",
                                maxHeight: "14px",
                                minWidth: "14px",
                                minHeight: "14px",
                              }}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </StyledTypography>
                        </Grid>
                        <Grid item xs={6}>
                          <StyledTotalTypography
                            align="left"
                            variant="subtitle1"
                          >
                            <span>
                              Total Price: ${item.quantity * item.price}
                            </span>
                          </StyledTotalTypography>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => removeAllFromCart(item)}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </StyledCard>
                </Grid>
              );
            })}
          </StyledGrid>
          <TotalPriceTypography align="right" variant="h5" gutterBottom>
            Total: ${totalPrice}
          </TotalPriceTypography>
          <CheckoutTypography align="right">
            <Link to="/">
              <Button variant="outlined">Back to menu</Button>
            </Link>
            <Link to="/checkout">
              <Button variant="contained">Checkout</Button>
            </Link>
          </CheckoutTypography>
        </>
      ) : (
        "There is no item in the cart"
      )}
    </Box>
  );
};

export { CartPage };
