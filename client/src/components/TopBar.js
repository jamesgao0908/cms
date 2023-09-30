import styled from "styled-components";
import React, { useState } from "react";
import sampleLogo from "../static/image/sampleLogo.jpg"; // 路径根据您的实际情况进行调整
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useCart } from "../utils/cartContext";
import { Link } from "react-router-dom";
import { stringAvatar } from "../utils/tools";
import { useGlobalConfigs } from "../store";
import api_userLogout from "../services/user/api_userLogout";

const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0px -1px 1px #e5eaf2;
  padding: 1rem 0;
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

const StyledLogoutButton = styled(Button)``;

const StyledLogInButton = styled(Button)``;

const TopBar = ({}) => {
  const { cartItems } = useCart();
  const [state, dispatch] = useGlobalConfigs();

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

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
          <Link to="/">
            <li>About</li>
          </Link>
        </StyledUl>
      </LeftPart>
      <RightPart>
        {!!state.user && (
          <Link to="/user">
            <Avatar {...stringAvatar(`${state.user.username}`)} />
          </Link>
        )}
        <Link to="/cart">
          <StyledButton variant="contained">
            <FontAwesomeIcon icon={faShoppingCart} />
            Cart
            <StyledCartItem>
              {totalQuantity > 99 ? "M" : totalQuantity}
            </StyledCartItem>
          </StyledButton>
        </Link>
        {!!state.user ? (
          <StyledLogoutButton
            onClick={() => {
              api_userLogout()
                .then(() => dispatch({ type: "SET_USER", payload: null }))
                .catch((err) => alert(err));
            }}
            variant="outlined"
          >
            logout
          </StyledLogoutButton>
        ) : (
          <Link to="/login">
            <StyledLogInButton variant="outlined">login</StyledLogInButton>
          </Link>
        )}
      </RightPart>
    </TopBarWrapper>
  );
};

export { TopBar };
