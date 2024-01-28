import React from 'react';
import { Box, ImageList, ImageListItem } from '@mui/material';
// import styled from 'styled-components';
import { useGlobalConfigs } from "../store";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));


const Instagram = ()=>{
  const [state] = useGlobalConfigs();

  console.log(state);

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Box sx={{ width: 750, height: 600, overflowY: 'hidden' }}>
        <ImageList variant="masonry" cols={4} gap={8}>
          { (state.ins && state) && state.ins.map((item, index) => (
            <ImageListItem key={index}>
              <img
                srcSet={`${item.images}`}
                src={`${item.images}`}
                alt={'images'}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );


  // return <Box>
  //   <Typography variant='h4'>Placeholder</Typography>
  //   <Grid container spacing={2} height={500}>
  //   {
  //     (state && state.ins) && state.ins.map((element, index)=>{
  //       return (
  //         <Grid item xs={4} key={index}>
  //           <Box style={{ 
  //             overflow: 'hidden',
  //             backgroundImage: `url(${element.images})`,
  //             backgroundSize: 'cover',
  //             height: '100%', // 使用百分比单位
  //             width: '100%',  // 使用百分比单位
  //             border: '1px solid red',  // 添加红色边框以便调试
  //             boxSizing: 'border-box'   // 确保边框不增加元素的实际大小
  //           }} />
  //         </Grid>
  //       )
  //     })
  //   }
  // </Grid>
  // </Box>
}

export default Instagram