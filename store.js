import React, { createContext, useReducer } from "react";

const initialState = {
  loading: false,
  error: false,
  currencies: [],
  currency1: "USD",
  currency1Rate: 0,
  currency2: "KES",
  currency2Rate: 0,
};

export const store = createContext(initialState);
const { Provider } = store;

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    let newState;

    switch (action.type) {
      case "SET_CURRENCIES":
        newState = { ...state, currencies: action.currencies };
        return newState;
      case "SET_CURRENCY1":
        newState = { ...state, currency1: action.currency1 };
        return newState;
      case "SET_CURRENCY2":
        newState = { ...state, currency2: action.currency2 };
        return newState;
      case "SET_RATE":
        newState = {
          ...state,
          currency1Rate: action.exchangeRate[state.currency1],
          currency2Rate: action.exchangeRate[state.currency2]
        };
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
