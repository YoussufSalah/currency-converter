export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    changeCurrency,
    amount,
    changeAmount,
  } = props;
  return (
    <div>
      <input
        type="number"
        className="input"
        value={parseFloat(amount)}
        onChange={changeAmount}
      />
      <select
        name={selectedCurrency}
        value={selectedCurrency}
        onChange={changeCurrency}
      >
        {currencyOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
