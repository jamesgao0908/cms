import axios from 'axios';
import { useReducer, useEffect, useMemo } from 'react';

const initialState = {
  data: null,
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const useGlobelConfigs = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useMemo = (()=>()=>{
    axios.get("http://localhost:8080/api/config/header")
      .then(response=>{
        dispatch({ type: 'SET_DATA', payload: response });
      })
      .catch( error =>{
        dispatch({ type: 'SET_ERROR', payload: error })
      })
  },[state])

  useEffect(()=>{
    console.log(initialState);
  })

  return [state, dispatch];
};


