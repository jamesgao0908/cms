import React from "react";
import {Box, Typography} from "@mui/material";
import theme from "../utils/theme";
import Logo from "../static/image/Logo.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import qrcode1 from '../static/QRcode/qrcode1.jpeg';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import WechatIcon from '../static/SVGs/wechat24.svg';

const Footer = ()=>{
  return <Box  minHeight="374px" bgcolor={theme.color.primary} p="1rem" m='0 auto' display='flex' alignItems='center' justifyContent='center'>
    <Box
      display="flex"
      sx={{ 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Box flex={1} display='flex' flexDirection='row'>
        <Box flex={3} display='flex' alignItems='center' justifyContent='center'>
          <img style={{ backgroundColor: 'white', borderRadius: '100%', border: '1px solid darkgreen' }} src={Logo} alt="logo" width={80} height={80} />
        </Box>
        <Box flex={6} display='flex' flexDirection='column' alignContent='center' justifyContent='center' gap='1rem'>
          <Box color='white' display='flex' alignItems='center' justifyContent='start' gap='0.5rem'><LocationOnIcon sx={{color:'white'}}/> 1 Kingfisher St, Lidcombe NSW</Box>
          <Box color='white' display='flex' alignItems='center' justifyContent='start' gap='0.5rem'><CallIcon sx={{color:"white"}}/> (61) 0410466077</Box>
          <Box color='white' display='flex' alignItems='center' justifyContent='start' gap='0.5rem'><EmailIcon sx={{color:"white"}}/> admin@irisbakeing.com</Box>
          <Box display='flex' flexDirection='row' gap='1rem'>
            <FacebookIcon sx={{color:"white"}}/>
            <InstagramIcon sx={{color:"white"}}/>
          </Box>
        </Box>
      </Box>
      <Box flex={1} display='flex' flexWrap='wrap' sx={{ flexDirection:{ xs:'row' , sm:'row'} }}>
        <Box>
          <Typography align="left" variant="p" width="100%" display="inline-block" color='white'>
            <WhatsAppIcon/>wechat
          </Typography>
          <img src={qrcode1} alt='qrcode1' height={80} width={80}/>
        </Box>
        <Box>
          <Typography align="left" variant="p" width="100%" display="inline-block" color='white'>
            <img src={WechatIcon} alt='wecchatIcon'/>wechat
          </Typography>
          <img src={qrcode1} alt='qrcode1' height={80} width={80}/>
        </Box>
        <Box>
          <Typography align="left" variant="p" width="100%" display="inline-block" color='white'>
            <img src={WechatIcon} alt='wecchatIcon' color="white"/>wechat
          </Typography>
          <img src={qrcode1} alt='qrcode1' height={80} width={80}/>
        </Box>
      </Box>
    </Box>
  </Box>

} 

export default Footer;