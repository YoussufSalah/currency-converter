import { useState, useEffect } from "react";
import CurrencyRow from "./components/CurrencyRow";
import "./App.css";

const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${
  import.meta.env.VITE_API_KEY
}`;

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currData, setCurrData] = useState({});
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    fromAmount = amount / exchangeRate;
    toAmount = amount;
  }

  // Fetch initial data for the currency options
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
        setCurrData(data.rates); // Save all rates for later calculations
      });
  }, []);

  // Calculate exchange rate based on EUR rates when either currency changes
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      const fromRate = currData[fromCurrency] || 1;
      const toRate = currData[toCurrency];
      setExchangeRate(toRate / fromRate); // Adjust relative to EUR
    }
  }, [fromCurrency, toCurrency, currData]);

  function handleFromAmountChange(e) {
    setAmount(+e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(+e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="container">
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        changeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        changeAmount={handleFromAmountChange}
      />
      <div className="equils">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        changeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        changeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
