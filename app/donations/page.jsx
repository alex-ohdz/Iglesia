// export default function Donations() {
//   return (
//     <form id="donation-form">
//       <input
//         type="text"
//         id="donor-name"
//         placeholder="Nombre del donante"
//         required
//       />
//       <input
//         type="email"
//         id="donor-email"
//         placeholder="Correo electrónico"
//         required
//       />
//       <input
//         type="number"
//         id="donation-amount"
//         placeholder="Monto de la donación"
//         required
//       />
//       <div id="card-element">Stripe Elements </div>
//       <button type="submit">Donar</button>
//     </form>
//   );
// }

// pages/donate.js
'use client'
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const DonateForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }), // Convertir a centavos
    });

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: document.getElementById('email').value,
        },
      },
    });

    if (error) {
      setMessage(`Payment failed: ${error.message}`);
    } else {
      setMessage('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        id="email"
        placeholder="Correo electrónico"
        required
      />
      <input
        type="number"
        id="amount"
        placeholder="Monto de la donación"
        required
        onChange={(e) => setAmount(e.target.value)}
      />
      <div>
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe || !elements}>
        Donar
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

const DonatePage = () => (
  <Elements stripe={stripePromise}>
    <DonateForm />
  </Elements>
);

export default DonatePage;
