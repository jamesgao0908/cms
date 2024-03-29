import { useReducer, useEffect } from "react";
import api_getHeader from "./services/config/api_getHeader";
import api_getFooter from "./services/config/api_getFooter";
import api_getAll from "./services/product/api_getAll";
import api_fetchProfile from "./services/user/api_fetchProfile";
import api_getIns from "./services/image/api_getIns";

const initialState = {
  header: null,
  footer: null,
  product: null,
  user: null,
  ins: null,
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_HEADER":
      return { ...state, header: action.payload, loading: false };
    case "SET_FOOTER":
      return { ...state, footer: action.payload, loading: false };
    case "SET_PRODUCT":
      return { ...state, product: action.payload, loading: false };
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "SET_INS":
      return { ...state, ins: action.payload, loading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const useGlobalConfigs = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAll = () => {
    api_getHeader()
      .then((response) => {
        dispatch({ type: "SET_HEADER", payload: response });
      })
      .catch((error) => {
        dispatch({ type: "SET_ERROR", payload: error });
      });
    api_getFooter()
      .then((response) => {
        dispatch({ type: "SET_FOOTER", payload: response });
      })
      .catch((error) => {
        dispatch({ type: "SET_ERROR", payload: error });
      });
    api_getAll()
      .then((response) => {
        dispatch({ type: "SET_PRODUCT", payload: response });
      })
      .catch((error) => {
        dispatch({ type: "SET_ERROR", payload: error });
      });
    api_fetchProfile()
      .then((response) => {
        dispatch({ type: "SET_USER", payload: response });
      })
      .catch((error) => {
        dispatch({ type: "SET_ERROR", payload: error });
      });
    api_getIns()
      .then((response) => {
        dispatch({ type: "SET_INS", payload: response });
      })
      .catch((error) => {
        dispatch({ type: "SET_ERROR", payload: error });
      });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return [state, dispatch];
};
