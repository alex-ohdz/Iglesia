"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PageShell from "@components/pageShell";

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
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl bg-white p-8 text-center shadow-xl"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sanctuaryTerracotta">
          Aporta a la misión
        </p>
        <h2 className="mt-2 text-3xl font-display text-sanctuaryBrick">Realizar una donación</h2>
      </div>
      <div className="w-full">
        <label htmlFor="paymentMethod" className="sr-only">
          Método de pago
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-sanctuaryTerracotta focus:outline-none focus:ring-1 focus:ring-sanctuaryTerracotta"
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
          <div className="w-full">
            <h3 className="mb-3 text-lg font-display text-sanctuaryBrick">
              Selecciona un monto
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[5, 10, 15, 20, 25, 30].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`h-12 rounded-md border text-sm font-semibold transition ${
                    amount === value
                      ? "bg-sanctuaryTerracotta text-white border-sanctuaryTerracotta"
                      : "bg-white text-sanctuaryTerracotta border-sanctuaryTerracotta hover:bg-sanctuaryGold/20"
                  }`}
                  onClick={() => handleAmountClick(value)}
                >
                  ${value}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full">
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Monto personalizado"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-center focus:border-sanctuaryTerracotta focus:outline-none focus:ring-1 focus:ring-sanctuaryTerracotta"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </div>
        </>
      )}
      <div className="flex w-full flex-col items-center gap-3">
        <button
          type="submit"
          className={`flex w-full items-center justify-center gap-3 rounded-md px-4 py-3 font-display text-lg font-semibold text-white shadow-md transition ${
            paymentMethod === "1"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-sanctuaryTerracotta hover:bg-sanctuaryBrick"
          }`}
          disabled={paymentMethod === "1"}
        >
          Donar
        </button>
      </div>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};

const DonatePage = () => (
  <PageShell>
    <section className="flex justify-center px-4 py-20">
      <DonateForm />
    </section>
  </PageShell>
);

export default DonatePage;
