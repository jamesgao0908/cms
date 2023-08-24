import { useReducer, useEffect } from 'react';
import api_getHeader from './services/config/api_getHeader';
import api_getFooter from './services/config/api_getFooter';
import api_getAll from './services/product/api_getAll';

const initialState = {
  header: null,
  footer: null,
  product: null,
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_HEADER':
      return { ...state, header: action.payload, loading: false };
    case 'SET_FOOTER':
      return { ...state, footer: action.payload, loading: false };
    case 'SET_PRODUCT':
      return { ...state, product: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const useGlobalConfigs = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAll = ()=>{
    api_getHeader()
    .then(response => {
      dispatch({ type: 'SET_HEADER', payload: response });
    })
    .catch(error => {
      dispatch({ type: 'SET_ERROR', payload: error });
    });
  api_getFooter()
    .then(response => {
      dispatch({ type: 'SET_FOOTER', payload: response });
    })
    .catch(error => {
      dispatch({ type: 'SET_ERROR', payload: error });
    });
  api_getAll()
    .then(response => {
      dispatch({ type: 'SET_PRODUCT', payload: response });
    })
    .catch(error => {
      dispatch({ type: 'SET_ERROR', payload: error });
    });
  }
  useEffect(() => {
    return ()=>fetchAll()
  }, []); 

  return [state, dispatch];
};