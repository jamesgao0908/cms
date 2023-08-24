import {useParams} from 'react-router-dom';
import {useGlobalConfigs} from '../store';
import React, {useEffect, useState} from 'react';
import {findProductIdById} from '../utils/findProductIdById';

const ProductPage = () => {
  const [state] = useGlobalConfigs();
  const {id} = useParams();
  const [cardInfo, setCardInfo] = useState(null);

  useEffect(() => {
    if (!!state.product) {
      setCardInfo(findProductIdById(state.product, parseInt(id)));
    }
  }, [state, id]);

  return (
    <div>
      <h2>Product Page</h2>
      <p>Product ID: {id}</p>
      {!!cardInfo && (
        <>
          <p>Product name : {cardInfo.product_name}</p>
          <p>Product description : {cardInfo.description}</p>
          <p>Product price : {cardInfo.price}</p>
          <p>Product stock : {cardInfo.stock}</p>
        </>
      )}
    </div>
  );
};

export {ProductPage};
