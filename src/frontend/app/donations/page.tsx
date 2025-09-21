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
    <>
      <BtnHome />
      <form
        onSubmit={handleSubmit}
        className="flex min-h-screen flex-col items-center justify-center gap-6 bg-sanctuary-stone px-4 py-10 font-body text-sanctuary-shadow"
      >
        <h2 className="text-center text-3xl font-display text-sanctuary-terracotta">Donar</h2>
        <div className="mb-3 w-[265px]">
          <label htmlFor="paymentMethod" className="sr-only">
            Método de pago
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full rounded-md border border-sanctuary-gold bg-white px-3 py-2 text-sm transition focus:border-sanctuary-terracotta focus:outline-none focus:ring-1 focus:ring-sanctuary-terracotta/60"
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
              <h3 className="mb-2 text-center font-display text-lg text-sanctuary-shadow">
                Selecciona un monto:
              </h3>
              <div className="grid grid-cols-2 justify-center gap-2">
                {[5, 10, 15, 20, 25, 30].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`h-10 w-32 rounded-md border p-1 font-display text-sm transition ${
                      amount === value
                        ? "border-sanctuary-terracotta bg-sanctuary-terracotta text-sanctuary-cream shadow-md"
                        : "border-sanctuary-terracotta bg-white text-sanctuary-terracotta hover:bg-sanctuary-gold/20"
                    }`}
                    onClick={() => handleAmountClick(value)}
                  >
                    ${value}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4 flex justify-center">
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Monto personalizado"
                className="w-[265px] rounded-md border border-sanctuary-gold p-2 focus:border-sanctuary-terracotta focus:outline-none focus:ring-1 focus:ring-sanctuary-terracotta/60"
                value={amount}
                onChange={handleAmountChange}
                required
              />
            </div>
          </>
        )}
        <div className="flex flex-col items-center justify-center gap-y-5">
          <button
            type="submit"
            className={`flex w-[265px] justify-center gap-3 rounded-md p-2 font-display tracking-[0.18em] text-sanctuary-cream shadow-md transition ${
              paymentMethod === "1"
                ? "cursor-not-allowed bg-sanctuary-shadow/40"
                : "bg-sanctuary-terracotta hover:bg-sanctuary-terracotta/90"
            }`}
            disabled={paymentMethod === "1"}
          >
            Donar
          </button>
        </div>
        {message && <p className="mt-4 text-sanctuary-terracotta">{message}</p>}
      </form>
    </>
  );
};

const DonatePage = () => <DonateForm />;

export default DonatePage;
