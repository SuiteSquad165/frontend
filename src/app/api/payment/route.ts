/* eslint-disable */

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");
  const { bookingId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { bookingId },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: `Room 1`,
              //   images: [image],
              description: `Stay in this wonderful place for 10 nights, from 10-30-24 to 11-30-24. Enjoy your stay!`,
            },
            unit_amount: 5000,
          },
        },
      ],
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
