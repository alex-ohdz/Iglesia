"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import BtnHome from "@components/btnHome";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const DonateForm = () => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("1"); // Set default value to "1"

  useEffect(() => {
    // Function to reset states
    const resetStates = () => {
      setAmount(0);
      setMessage("");
      setPaymentMethod("1");
    };

    // Reset states on mount
    resetStates();

    // Reset states and reload page on browser back/forward navigation
    const handlePopState = () => {
      resetStates();
      location.reload();
    };

    window.addEventListener("popstate", handlePopState);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleAmountClick = (value) => {
    setAmount(value);
  };

  const handleAmountChange = (e) => {
    const value = Number(e.target.value);
    if (value < 0) {
      setAmount(0);
    } else {
      setAmount(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (paymentMethod === "stripe") {
      const stripe = await stripePromise;

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    } else if (paymentMethod === "tropipay") {
      window.location.href = "https://tppay.me/lxz3ye55";
    }
  };

  return (
    <><BtnHome/>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center p-4 bg-gray-200 h-screen rounded-md shadow-md"
    >
      
      <h2 className="mb-4 text-center text-2xl font-bold">Donar</h2>
      <div className="mb-3 w-[265px]">
        <label htmlFor="paymentMethod" className="sr-only">
          Método de pago
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          <option value="1" disabled>
            Seleccione un método de pago
          </option>
          <option value="stripe">Stripe</option>
          <option value="tropipay">TropiPay</option>
        </select>
      </div>
      {paymentMethod === "stripe" && (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Selecciona un monto:
            </h3>
            <div className="grid grid-cols-2 justify-center gap-2">
              {[5, 10, 15, 20, 25, 30].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`p-1 w-32 h-10 rounded-md border ${
                    amount === value
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  }`}
                  onClick={() => handleAmountClick(value)}
                >
                  ${value}
                </button>
              ))}
            </div>
          </div>
          <div className="flex mb-4 justify-center">
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Monto personalizado"
              className="p-2 w-[265px] border rounded-md"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </div>
        </>
      )}
      <div className="flex flex-col gap-y-5 justify-center items-center">
        <button
          type="submit"
          className={`flex font-serif font-semibold p-2 gap-3 rounded-md w-[265px] justify-center shadow-md text-white ${
            paymentMethod === "1"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-600 "
          }`}
          disabled={paymentMethod === "1"}
        >
          Donar
        </button>
      </div>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
    </>
  );
};

const DonatePage = () => <DonateForm />;

export default DonatePage;
