import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

export default function Product() {
  let { id } = useParams();
  const[data, setData] = useState();

  const fetchProduct =useMemo(()=>()=>{
    axios.get(`http://localhost:8080/product/${id}`).then(response => {
      setData(response.data[0])
    });
  },[])

  useEffect(()=>{
    fetchProduct()
  },[fetchProduct])

  return<div>
    {
      !!data && <div>
        <h1>{data.name}</h1>
        <h4>{data.category}</h4>
      </div>
    }
  </div>
}