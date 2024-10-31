import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from "next/navigation";

import { NextResponse, type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id") as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    // const bookingId = session.metadata?.bookingId;
    // Todo: fix this later, let booking id as a const value
    const bookingId = 123;

    if (session.status !== "complete" || !bookingId) {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
  redirect("/bookings");
};
