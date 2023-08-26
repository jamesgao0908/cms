import styled from "styled-components";
import React from "react";
import sampleLogo from "../static/image/sampleLogo.jpg"; // 路径根据您的实际情况进行调整
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useCart } from "../utils/cartContext";
import { Link } from "react-router-dom";
import { stringAvatar } from "../utils/tools";
import { useGlobalConfigs } from "../store";

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
const RightPart = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const StyledButton = styled(Button)`
  display: flex;
  gap: 0.5rem;
  height: 100%;
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

const TopBar = ({}) => {
  const { cartItems } = useCart();
  const [state] = useGlobalConfigs();

  return (
    <TopBarWrapper>
      <LeftPart>
        <Link to="/">
          <img src={sampleLogo} alt="logo" height={40} />
        </Link>
        <StyledUl>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
        </StyledUl>
      </LeftPart>
      <RightPart>
        <Link to="/user">
          {!!state.user ? (
            <Avatar {...stringAvatar(`${state.user.username}`)} />
          ) : (
            <Link to="/login">
              <Button variant="outlined">login</Button>
            </Link>
          )}
        </Link>
        <Link to="/cart">
          <StyledButton variant="contained">
            <FontAwesomeIcon icon={faShoppingCart} />
            Cart
            <StyledCartItem>
              {cartItems.length > 99 ? "M" : cartItems.length}
            </StyledCartItem>
          </StyledButton>
        </Link>
      </RightPart>
    </TopBarWrapper>
  );
};

export { TopBar };
