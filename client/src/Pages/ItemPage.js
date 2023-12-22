import { useParams } from "react-router-dom";
import { useGlobalConfigs } from "../store";
import React, { useEffect, useState } from "react";
import { findProductIdById } from "../utils/findProductIdById";
import { Typography, Container, Paper, Box, Button } from "@mui/material";
import { styled } from "styled-components";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../utils/cartContext";
import { formatAllImagesToArray } from "../utils/tools";
import { Breadcrumb } from "reactstrap";
import api_getOne from "../services/product/api_getOne";

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from 'swiper/core';


const BreadcrumbNav = styled.div``;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
`;
const LeftPart = styled(Box)`
  flex: 1;
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const RightPart = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const StyledLeft = styled(Box)`
  max-width: 100%
`


const ItemPage = () => {
  const [state] = useGlobalConfigs();
  const { id } = useParams();
  const [cardInfo, setCardInfo] = useState(null);
  const { addToCart } = useCart();
  const [data, setData] = useState(null);
  SwiperCore.use([Pagination]);

  useEffect(() => {
    if (!!state.product) {
      setCardInfo(findProductIdById(state.product, parseInt(id)));
    }
    fetchData();
  }, [state, id]);

  const fetchData = async () => {
    try {
      const result = await api_getOne(id);
      setData(result);
    } catch (error) {
      console.error('获取数据出错:', error);
    }
  };

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };


  return (
    <>
      <BreadcrumbNav>BreadcrumbNav/placeholder/goesHere</BreadcrumbNav>
      <StyledBox>
        <LeftPart>
          {
            data !== null && (
              <>
                <StyledLeft
                  className="WTF1"
                  style={{ height: '400px', width: '400px' }}
                >
                  <Swiper
                    className="swiperImage"
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={true}
                    loopedSlides={6}
                  >
                    {
                      data.imgs.images.map((element, index) => {
                        return <SwiperSlide key={index}>
                          <img height={400} width={400} src={element} alt={element} />
                        </SwiperSlide>
                      })
                    }
                  </Swiper>
                </StyledLeft>

                <Box
                  className="WTF2"
                  style={{ height: '200px', width: 'auto' }}
                >
                  <Swiper
                    className="swiperThumbs"
                    slidesPerView={3}
                    spaceBetween={10}
                    centeredSlides={true}
                    loop={true}
                    slideToClickedSlide={true}
                  >
                    {
                      data.imgs.images.map((element, index) => {
                        return <SwiperSlide key={index}>
                          <img height={200} width={200} src={element} alt={element} />
                        </SwiperSlide>
                      })
                    }
                  </Swiper>
                </Box>
              </>
            )
          }
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
      </StyledBox >
    </>
  );
};

export { ItemPage };
