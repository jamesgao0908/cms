import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  background-color: rgb(254, 248, 244);
  height: 1.5rem;
  color: white;
  display: flex;
  justify-content: center;
`;

const Left = styled.div``;
const Right = styled.div`
  display: flex;
`;
const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
`;
const ContactWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TopBar = ({}) => {
  return (
    <Wrapper>
      <Left>
        <FacebookIcon style={{ fill: "grey" }} />
        <Link to="https://www.instagram.com/elf_cake_syd/">
          <InstagramIcon style={{ fill: "grey" }} />
        </Link>
      </Left>
      <Right>
        <LocationWrapper>
          <LocationOnIcon style={{ fill: "grey" }} />
          <span style={{ color: "grey" }}>
            2 kingfisher street lidcombe nsw 2141
          </span>
        </LocationWrapper>
        <ContactWrapper>
          <span style={{ color: "grey" }}>61-0451818426</span>
        </ContactWrapper>
      </Right>
    </Wrapper>
  );
};

export default TopBar;
