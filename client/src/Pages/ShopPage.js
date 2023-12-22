import React, { useEffect } from "react";
// import { ItemCard } from "../components";
import AllComponents from "../components";
import { useGlobalConfigs } from "../store";
import { Box, Grid } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledBox = styled(Box)`
  margin: 0 auto;
`;

const ShopPage = () => {
  const [state] = useGlobalConfigs();
  // console.log('state', state);

  useEffect(() => { }, [state]);
  return (
    <StyledBox sx={{ p: 2, maxWidth: 1084 }}>
      <Grid container spacing={4}>
        {!!state &&
          state.product instanceof Array &&
          state.product.map((element, index) => {
            // console.log(element);
            return (
              <>
                <Grid item key={index}>
                  <Link to={`/product/${element.product_id}`}>
                    <AllComponents.ItemCard data={element} />
                  </Link>
                </Grid>
              </>
            );
          })}
      </Grid>
    </StyledBox>
  );
};

export { ShopPage };
