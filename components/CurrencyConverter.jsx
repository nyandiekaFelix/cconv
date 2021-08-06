import React, { useEffect, useContext, useState } from "react";

import { Loader } from "./";
import { store } from "../store.js";

export default function CurrencyConverter() {
  const state = useContext(store);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    dispatch,
    state: { currencies, currency1, currency2, currency1Rate, currency2Rate }
  } = state;

  console.log(state)

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://api.exchangerate.host/symbols");
        const data = await response.json();

        setLoading(false);
        setError(false);
        dispatch({ type: "SET_CURRENCIES", currencies: data.symbols });
      } catch (error) {
        console.log("[CURRENCY FETCH ERR]:", error);
        dispatch({ type: "SET_CURRENCIES", currencies: [] });
        setError(true);
        setAlert("Error Occured When Fetching Currencies");
      }
    };
    getCurrencies();
  }, []);

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://api.exchangerate.host/latest?symbols=${currency1},${currency2}`);
        const data = await response.json();

        setLoading(false);
        setError(false);
        dispatch({ type: "SET_RATE", exchangeRate: data.rates });
      } catch (error) {
        console.log("[CURRENCY FETCH ERR]:", error);
        setError(true);
        setAlert("Error Occured When Getting Rate");
      }
    };
    getCurrencies();
  }, [currency1, currency2]);

  const selectCurrency1 = (ev) => {
    dispatch({ type: "SET_CURRENCY1", currency1: ev.target.value });
  };

  const selectCurrency2 = (ev) => {
    dispatch({ type: "SET_CURRENCY2", currency2: ev.target.value });
  };

  return (
    <>
      {loading && <Loader />}
      {error && (
        <div className="error">
          <span>{`Failed to get currencies: ${alert}`}</span>
          <style jsx>
            {`
              .error {
                color: red;
                width: 100%;
              }
            `}
          </style>
        </div>
      )}
      <div className="rates">
        <div>
          <label htmlFor="rate1">{currency1}: </label>
          <span id="rate1">{currency1Rate}</span>
        </div>
        <div>
          <label htmlFor="rate2">{currency2}: </label>
          <span id="rate2">{currency2Rate}</span>
        </div>
      </div>
      {!loading && currencies && (
        <div className="currency-select">
          <div>
            <label htmlFor="currency1-input">Base Currency: </label>
            <select
              name="currency1"
              id="currency1-input"
              onChange={selectCurrency1}
              defaultValue={currency1}
            >
              <option value={currency1} selected disabled hidden>
                {currency1}
              </option>
              {Object.keys(currencies).map((currency, id) => (
                <option className="code" key={id} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="currenc2-input">Convert To: </label>
            <select
              name="currency2"
              id="currency2-input"
              onChange={selectCurrency2}
              defaultValue={currency2}
            >
              <option value={currency2} selected disabled hidden>
                {currency2}
              </option>
              {Object.keys(currencies).map((currency, id) => (
                <option className="code" key={id} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <style jsx>
            {`
              .currency-select {
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                height: 40px;
              }
              label {
                font-size: 20px;
                font-weight: 600;
                line-height: 40px;
                height: 40px;
                text-transform: uppercase;
                margin: 0;
              }
              select {
                text-align: left;
                min-width: 200px;
                font-size: 20px;
                cursor: pointer;
                height: 30px;
                text-transform: capitalize;
              }
              .rates {
                margin-left: 10px;
              }
              #rate1, #rate2 {
                font-size: 20px;
                padding-left: 30px
              }
              @media screen and (max-width: 576px) {
                .currency-select {
                  margin-top: 40px;
                }
                select {
                  max-width: 200px;
                }
              }
            `}
          </style>
        </div>
      )}
    </>
  );
}
