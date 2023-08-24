import React, {useEffect} from 'react';
import {TopBar, ItemCard} from '../components';
import {useGlobalConfigs} from '../store';
import {Box, Grid} from '@mui/material';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  margin: 0 auto;
`;

const StyledTopBarWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 99;
`;

const HomePage = () => {
  const [state] = useGlobalConfigs();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <StyledBox sx={{p: 2, maxWidth: 1084}}>
      {!!state.header && state.header.contact instanceof Array && ( 
      <StyledTopBarWrapper>
          <TopBar data={state.header.contact} />
        </StyledTopBarWrapper>
      )}
      <Grid container spacing={4}>
        {!!state &&
          state.product instanceof Array &&
          state.product.map((element, index) => {
            return (
              <Grid item key={index}>
                <ItemCard itemCardInfo={element} />
              </Grid>
            );
          })}
      </Grid>
    </StyledBox>
  );
};

export {HomePage};
