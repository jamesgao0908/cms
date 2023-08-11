import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export default function Home(){
  const [produtsInfo, setProductsInfo] = useState([]);

  const fetchAllProducts =useMemo(()=>()=>{
    axios.get("http://localhost:8080/allproducts").then(response => {
      setProductsInfo(response.data)
      console.log(response.data)
    });
  },[])

  useEffect(()=>{
    fetchAllProducts()
  },[fetchAllProducts])

  return (<div>
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