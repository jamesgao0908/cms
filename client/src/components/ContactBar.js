
import styled from "styled-components";
import React from "react";

const ContantBarWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
`
const ContactTitle = styled.div``;

const DeliveryTitle = styled.div``;

const MoreInfoTitle = styled.ul`
  display:flex;
  list-style: none;
  gap: 1.5rem;
`;

const ContactTitleList = styled.ul`
  list-style: none;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding: 0;
`;

const ContactBar = (data) => {
  
  const contactInfos = data.data

  const deliveryInfos = {
    "title": "Opening hours 9 a.m. - 6 p.m" 
  }

  return (
    <ContantBarWrapper>
      <ContactTitle>
        <ContactTitleList>
        {
          !!contactInfos && contactInfos.map((element, index)=>{
            return <li key={index}>{element.title} {element.value}</li>
          })  
        }
        </ContactTitleList>
      </ContactTitle>
      <DeliveryTitle>
        {
          !!deliveryInfos && deliveryInfos.title
        }
      </DeliveryTitle>
      <MoreInfoTitle>
        <li><button>Shipping</button></li>
        <li><button>About</button></li>
      </MoreInfoTitle>    
    </ContantBarWrapper>
  );
};

export { ContactBar }