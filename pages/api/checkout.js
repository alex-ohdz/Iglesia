import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Donación',
              },
              unit_amount: amount * 100, // Stripe requiere el monto en centavos
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      if (error.type === 'StripeInvalidRequestError' || error.type === 'StripeAPIError') {
        // Errores graves que justifican redirección a cancel
        res.status(500).json({ redirect: 'cancel', error: error.message });
      } else {
        // Otros errores que pueden ser manejados en el frontend
        res.status(500).json({ error: error.message });
      }
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
