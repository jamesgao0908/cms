import styled from 'styled-components';
import React from 'react';
import sampleLogo from '../static/image/sampleLogo.jpg'; // 路径根据您的实际情况进行调整
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import {useCart} from '../utils/cartContext';

const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftPart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;
const RightPart = styled.div``;

const StyledButton = styled(Button)`
  display: flex;
  gap: 0.5rem;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: inline-flex;
  flex-direction: row;
  margin: 0;
  gap: 0.5rem;
`;

const StyledCartItem = styled.span`
  color: #1976d2;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const TopBar = (data) => {
  const {cartItems} = useCart();

  return (
    <TopBarWrapper>
      <LeftPart>
        <img src={sampleLogo} alt="logo" height={40} />
        <StyledUl>
          <li>Home</li>
          <li>About</li>
          <li>Product</li>
        </StyledUl>
      </LeftPart>
      <RightPart>
        <StyledButton variant="contained">
          <FontAwesomeIcon icon={faShoppingCart} />
          Cart
          <StyledCartItem>
            {cartItems.length > 99 ? 'M' : cartItems.length}
          </StyledCartItem>
        </StyledButton>
      </RightPart>
    </TopBarWrapper>
  );
};

export {TopBar};
