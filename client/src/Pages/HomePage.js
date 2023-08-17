import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Header, ContactBar } from '../components';

const HomePage = (
  userinfo
) => {
  const [produtsInfo, setProductsInfo] = useState([]);
  const [headerInfo,setHeaderInfo]=useState();

  const fetchAllProducts =useMemo(()=>()=>{
    axios.get("http://localhost:8080/allproducts").then(response => {
      setProductsInfo(response.data)
    });
    axios.get("http://localhost:8080/api/config/header").then(response=>{
      setHeaderInfo(response.data)
    })
  },[])

  useEffect(()=>{
    fetchAllProducts()
  },[fetchAllProducts])

  return (<div>
    <ContactBar data={headerInfo}/>
    <Header />
    {
      !!produtsInfo && produtsInfo.map((element, index)=>{
        return (<div key={index}>
          <h1>{element.name}</h1>
          <h4>{element.category}</h4>
        </div>)
      })
    }
  </div>)
}

export { HomePage };