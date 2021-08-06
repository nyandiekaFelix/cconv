import React from "react";
import Head from "next/head";
import { StateProvider } from "../store.js";
import CurrencyConverter from "../components/CurrencyConverter";

const HomePage = () => (
  <div>
    <Head>
      <title>Currency Converter App</title>
      <meta charSet="utf-8" />
      <meta name="author" content="Felix N" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Currency Converter App" />
    </Head>
    <div className="content">
      <StateProvider>
        <CurrencyConverter />
      </StateProvider>
    </div>
    <style jsx global>
      {`
        :root {
          --font-color: #000;
          --custom-bg: #fff;
          --font: sans-serif;
        }
        body {
          background-color: var(--custom-bg);
          color: var(--font-color);
          font-family: var(--font);
        }
        a {
          cursor: pointer;
          text-decoration: none;
        }
        .content {
          margin: 0 auto;
          width: 100%;
          max-width: 578px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
      `}
    </style>
  </div>
);

export default HomePage;
