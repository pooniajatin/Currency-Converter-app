import { useState } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          `url('https://images.pexels.com/photos/2678301/pexels-photo-2678301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full max-w-md bg-gradient-to-r from-white/70 to-gray-100/50 backdrop-blur-md p-8 rounded-2xl shadow-lg border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <h1 className="text-2xl text-center font-bold text-gray-800 mb-6">Currency Converter</h1>

          <div className="w-full mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOption={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
              className="shadow-sm"
            />
          </div>

          <div className="relative w-full my-4">
            <button
              type="button"
              className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-500 transition"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          <div className="w-full mt-4 mb-6">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOption={options}
              onCurrencyChange={(currency) => setTo(currency)}
              amountDisable
              className="shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-3 rounded-xl shadow-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
