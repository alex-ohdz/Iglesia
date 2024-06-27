'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const DonateForm = () => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleAmountClick = (value) => {
    setAmount(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      setMessage(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Donar</h2>
      <input
        type="email"
        id="email"
        placeholder="Correo electrónico"
        required
        className="p-2 mb-4 w-full border rounded-md"
      />
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Selecciona un monto:</h3>
        <div className="grid grid-cols-5 gap-2">
          {[5, 10, 15, 20, 25].map((value) => (
            <button
              key={value}
              type="button"
              className={`p-2 rounded-md border ${amount === value ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
              onClick={() => handleAmountClick(value)}
            >
              ${value}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <input
          type="number"
          id="amount"
          placeholder="Monto personalizado"
          className="p-2 w-full border rounded-md"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full">
        Donar
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};

const DonatePage = () => (
  <DonateForm />
);

export default DonatePage;
