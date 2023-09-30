import { useParams } from "react-router-dom";
import { useGlobalConfigs } from "../store";
import React, { useEffect, useState } from "react";
import { findProductIdById } from "../utils/findProductIdById";
import { Typography, Container, Paper, Box, Button } from "@mui/material";
import { styled } from "styled-components";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../utils/cartContext"; // 根据您的实际路径进行导入
import { formatAllImagesToArray } from "../utils/tools";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
`;
const LeftPart = styled(Box)`
  flex: 1;
  max-width: 50%
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RightPart = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledSwiper = styled(Swiper)`
  max-width: 200px; /* 调整为您希望的最大宽度 */
  margin: 0 auto;
`;

const ProductPage = () => {
  const [state] = useGlobalConfigs();
  const { id } = useParams();
  const [cardInfo, setCardInfo] = useState(null);
  const { addToCart } = useCart();

  if (!!cardInfo) console.log(formatAllImagesToArray(cardInfo.all_images));

  useEffect(() => {
    if (!!state.product) {
      setCardInfo(findProductIdById(state.product, parseInt(id)));
    }
  }, [state, id]);

  return (
    <StyledBox>
      <LeftPart>
        {!!cardInfo && (
          <StyledSwiper
            pagination={true}
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
          >
            {formatAllImagesToArray(cardInfo.all_images).map((e, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={e} alt="" />
                </SwiperSlide>
              );
            })}
          </StyledSwiper>
        )}
      </LeftPart>
      <RightPart>
        {!!cardInfo && (
          <>
            <Typography variant="h2" gutterBottom>
              {cardInfo.product_name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              ${cardInfo.price}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {cardInfo.description}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => addToCart(cardInfo)}
            >
              Add to cart
            </Button>
          </>
        )}
      </RightPart>
    </StyledBox>
  );
};

export { ProductPage };
