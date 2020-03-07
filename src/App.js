import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(8);
  const [period, setPeriod] = useState(10);

  useEffect(() => {
    math();
  }, [amount, rate, period]);

  const [monthlyPayment, setMonthlyPayment] = useState(466);
  const [totalCost, setTotalCost] = useState(151777);

  const handleAmountChange = event => {
    const cleanAmount = removeCommas(event.target.value);
    setAmount(cleanAmount);
  };

  const handleRateChange = event => {
    setRate(event.target.value);
  };

  const handlePeriodChange = event => {
    setPeriod(event.target.value);
  };

  const math = () => {
    if (!period) return setMonthlyPayment(0);

    const months = period * 12;

    setMonthlyPayment(Math.round(amount / months));

    if (!rate || parseInt(rate) === 0) {
      setTotalCost(amount);
    } else {
      const rateDecimal = rate / 1200;

      const top = Math.round(rateDecimal * amount * months);
      const bottom = 1 - Math.pow(1 + rateDecimal, -months);
      setTotalCost(Math.round(top / bottom));
    }
  };

  const addCommas = x => {
    if (!x) return '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const removeCommas = x => {
    return parseInt(x.replace(/,/g, ''));
  };

  return (
    <div className="App">
      <div className="flex-item">
        <h3>Loan Calcuator</h3>
        <div className="flex-container">
          <div className="flex-item">
            <sup>Amount</sup>
            <input
              className="input"
              value={addCommas(amount)}
              onChange={handleAmountChange}
            ></input>
          </div>

          <div className="flex-item">
            <sup>Interest Rate (%)</sup>
            <div>
              <input
                className="input"
                value={rate}
                onChange={handleRateChange}
              ></input>
            </div>
          </div>

          <div className="flex-item">
            <sup>Period (years)</sup>
            <div>
              <input
                className="input"
                value={period}
                onChange={handlePeriodChange}
              ></input>
            </div>
          </div>
        </div>

        <div className="flex-container">
          <div>
            <sup>Total Loan Cost &nbsp; ${addCommas(totalCost)}</sup>
          </div>
        </div>

        <div className="flex-container">
          <div>Monthly Payment &nbsp; ${addCommas(monthlyPayment)}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
