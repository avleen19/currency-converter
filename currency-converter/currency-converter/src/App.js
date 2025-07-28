import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("inr");
  const [toCurrency, setToCurrency] = useState("usd");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setResult(amount);
      return;
    }

    const fetchRate = async () => {
      try {
        const res = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`
        );
        const data = await res.json();
        const rate = data[fromCurrency][toCurrency];
        setResult((amount * rate).toFixed(2));
      } catch (error) {
        console.error("Failed to fetch exchange rate", error);
        setResult("Error");
      }
    };

    fetchRate();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="card">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="inr">INR</option>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
        </select>
        <span>to</span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>
        <h2>
          {amount} {fromCurrency.toUpperCase()} ={" "}
          {result ? `${result} ${toCurrency.toUpperCase()}` : "Loading..."}
        </h2>
      </div>
    </div>
  );
}

export default App;
