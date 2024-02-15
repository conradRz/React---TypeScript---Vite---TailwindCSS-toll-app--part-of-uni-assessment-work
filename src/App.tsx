// App.tsx

import { useState, useEffect } from 'react';
import PaypalComponent  from './PaypalComponent';

// Define options outside of the component
const options = [
  { id: 1, label: 'Single person, light load', price: '1 As', priceInAs: 1 },
  { id: 2, label: 'Single person, heavy load', price: '2 As', priceInAs: 2 },
  { id: 3, label: 'Single person, hand-drawn cart', price: '1 Dupondius, 1 As', priceInAs: 3 },
  { id: 4, label: '1 horse + rider', price: '2 Dupondius', priceInAs: 4 },
  { id: 5, label: 'Horse-drawn cart, 1 horse', price: '3 Dupondius', priceInAs: 6 },
  { id: 6, label: 'Horse-drawn cart, 2–3 horses', price: '4 Dupondius', priceInAs: 8 },
  { id: 7, label: 'Horse-drawn cart, 4–5 horses', price: '1 Denarius', priceInAs: 10 },
  { id: 8, label: 'Horse-drawn cart, 6 horses', price: '1 Denarius, 2 Sestertius', priceInAs: 12.5 },
];

const TollApp = () => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [total, setTotal] = useState(0);

  const handleOptionClick = (optionId: number) => {
    const isSelected: boolean = (selectedOptions as number[]).includes(optionId);

    setSelectedOptions((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== optionId)
        : [...prevSelected, optionId]
    );
  };

  useEffect(() => {
    const newTotal = selectedOptions.reduce((acc, optionId) => {
      const selectedOption = options.find((option) => option.id === optionId);
      return acc + (selectedOption?.priceInAs ?? 0); // nullish coalescing check to ensure that selectedOption is not undefined before accessing its properties
    }, 0);
    setTotal(newTotal);
  }, [selectedOptions]);

  const renderOptions = () => {
    return options.map((option) => (
      <button
        key={option.id}
        className={`p-4 border select-none ${
          (selectedOptions as number[]).includes(option.id) ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-800'
        }`}
        onClick={() => handleOptionClick(option.id)}
        aria-pressed={(selectedOptions as number[]).includes(option.id)}
      >
        <p className="font-bold">{option.label}</p>
        <p className="font-medium">{option.price}</p>
      </button>
    ));
  };

  return (
<div className="flex flex-col items-center p-8">
  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">{renderOptions()}</div>
  <div className="mt-4 w-full max-w-xl"> {/* Adjust the width as needed */}
    {/* Pass the 'total' prop to PaypalComponent component */}
    <PaypalComponent total={total} selectedOptions={selectedOptions} />
  </div>
</div>

  );
};

export default TollApp;

// in production, would benefit from https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/