import React from "react";
import { Card, Typography, CardMedia } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useCart } from "../utils/cartContext"; // 根据您的实际路径进行导入
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const MuiCustomTypography = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StyledCard = styled(Card)`
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

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

const StyledContentTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 最多两行 */
  overflow: hidden;
`;

export const ItemCard = (data) => {
  const { addToCart } = useCart(); // 使用 useCart 钩子来获取购物车操作

  return (
    <StyledLink to={`/product/${data.itemCardInfo.product_id}`}>
      <StyledCard sx={{ width: 240, height: 350 }} variant="outlined">
        <CardMedia
          sx={{ width: 240, height: 185 }}
          image={data.itemCardInfo.image_urls}
          title={data.itemCardInfo.product_name}
          component="img"
        />
        <StyledBox height={165}>
          <StyledTitleTypography align="left" variant="h6" gutterBottom>
            {data.itemCardInfo.product_name}
          </StyledTitleTypography>
          <StyledContentTypography variant="subtitle2" gutterBottom>
            {data.itemCardInfo.description}
          </StyledContentTypography>
          <MuiCustomTypography align="center" variant="subtitle2">
            {"$" + data.itemCardInfo.price}
            <FontAwesomeIcon
              icon={faCartPlus}
              onClick={(e) => {
                e.preventDefault();
                addToCart(data.itemCardInfo);
              }}
            />
          </MuiCustomTypography>
        </StyledBox>
      </StyledCard>
    </StyledLink>
  );
};
