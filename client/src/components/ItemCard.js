import React from "react";
import { Card, Typography, CardMedia, Box } from "@mui/material";
import styled from "styled-components";


// const MuiCustomTypography = styled(Typography)`
//   && {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }
// `;

const StyledCard = styled(Card)`
  cursor: pointer;
`;

// const StyledLink = styled(Link)`
//   text-decoration: none;
// `;

const StyledBox = styled(Box)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

const StyledTitleTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemCard = ({ data }) => {

  return (
    <StyledCard sx={{ width: 240, boxShadow: 'rgba(51, 49, 50, 0.157) 0px 4px 4px' }} variant="outlined">
      <CardMedia sx={{ width: 240, height: 185 }} image={data.image_urls} title={data.product_name} component="img" />
      <StyledBox sx={{ height: 110 }}>
        <StyledTitleTypography align="left" variant="h6" gutterBottom>
          {data.product_name}
        </StyledTitleTypography>
        {/* <MuiCustomTypography align="center" variant="subtitle2">
          {"$" + data.price}
          <FontAwesomeIcon
            icon={faCartPlus}
            onClick={(e) => {
              e.preventDefault();
              addToCart(data);
            }}
          />
        </MuiCustomTypography> */}
      </StyledBox>
    </StyledCard>
  );
};

export default ItemCard;
