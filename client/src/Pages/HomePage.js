import React, { useEffect } from "react";
import { useGlobalConfigs } from "../store";
// import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import ItemCard from "../components/ItemCard";
import BannerCard from "../components/BannerCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

const HomePage = () => {
  const [state] = useGlobalConfigs();
  SwiperCore.use([Pagination, Autoplay]);

  useEffect(() => {
    // console.log(state.product);
  })

  return (
    <>
      {/* homepage new products swpier */}
      <Box sx={{ maxWidth: 'lg' }} style={{ margin: '0 auto' }}>
        <Box sx={{ maxWidth: '1000px' }} style={{ margin: '1rem auto' }}>
          <Typography align="center" variant="h4">
            NEW PRODUCTS
          </Typography>
          <Typography align="center" variant="p" width="100%" display="inline-block">
            SPECAILLY MADE FOR YOU
          </Typography>
          <Swiper
            style={{ height: "345px", maxWidth: '1000px' }}
            pagination={{
              clickable: true,
            }}
            spaceBetween={10}
            slidesPerView="auto"
            breakpoints={{
              0: {
                slidesPerView: 'auto',
              },
              500: {
                slidesPerView: 2
              },
              750: {
                slidesPerView: 3,
              },
              1000: {
                slidesPerView: 4,
              }
            }}
          >
            {
              (state.product !== null) && state.product.map((element, index) => {
                return (<SwiperSlide key={index}>
                  <ItemCard data={element} />
                </SwiperSlide>)
              })
            }
          </Swiper>
        </Box>
      </Box>
      {/* secondary banner */}
      <Box>
      </Box>
      {/* homepage our story banner*/}
      <Box maxWidth='1000px' m="0 auto">
        <Typography align="center" variant="h4">
          ABOUT US
        </Typography>
        <Typography align="center" variant="p" width="100%" display="inline-block">
          Our story
        </Typography>
        <BannerCard />
      </Box>
    </>
  );
};

export { HomePage };
