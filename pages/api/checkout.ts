import type { NextApiRequest, NextApiResponse } from "next";
import { createCheckoutSession } from "@backend/services/checkout";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { amount } = req.body as { amount: number };

  try {
    const session = await createCheckoutSession(req.headers.origin ?? "", amount);
    res.status(200).json({ id: session.id });
  } catch (error: any) {
    console.error("Error creating checkout session", error);
    res.status(500).json({ error: error.message ?? "Error creating checkout session" });
  }
}
