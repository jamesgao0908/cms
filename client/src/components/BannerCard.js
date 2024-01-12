import React from "react";
import { Box, Typography } from "@mui/material";
import img1 from '../static/image/img1.jpg';

const BannerCard = () => {
  return <>
    <Box
      margin="1rem auto"
      display="flex"
      boxShadow="6px 3px 14.3px 0 rgba(0, 0, 0, 0.23)"
      maxWidth="lg"
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row"
        },
        m: {
          xs: "1rem",
          sm: '1rem 0'
        }
      }}
    >
      <Box sx={{ flex: 1 }}>
        <img
          src={img1}
          alt='img_placeholder'
          height={80}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100%",
            height: "100%",
            verticalAlign: "top"
          }}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" align="left">
          Our story
        </Typography>
        <Typography variant="h6" align="left">
          ELF CAKE is a small-scale personal cake making business.
        </Typography>
        <Typography variant="h6" align="left">
          We insist on using high-quality ingredients and hand-made our products, committing to bring you a better AND sweet experience ON your special day.
        </Typography>
        <Typography variant="h6" align="left">
          Whether it's birthday, festival, anniversary or any party, we can customize a cake just for you!
        </Typography>
      </Box>
    </Box>
  </>
}

export default BannerCard;