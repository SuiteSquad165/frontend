/* eslint-disable */
import Stripe from "stripe";
import nodemailer from "nodemailer";
import { NextResponse, type NextRequest } from "next/server";
import { formatDateStripe } from "@/utils/format";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");
  const { sessionId, bookingDetails, token } = await req.json();

  const {
    roomId,
    orderTotal,
    nights,
    checkIn,
    checkOut,
    hotel,
    room,
    recipientEmail,
  } = bookingDetails;

  try {
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { sessionId, roomId },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: `${hotel?.name} - ${room?.name}`,
              images: [hotel.imageUrls[0]],
              description: `Stay in this wonderful place for ${nights} nights, from ${formatDateStripe(
                checkIn
              )} to ${formatDateStripe(checkOut)}. Enjoy your stay!`,
            },
            unit_amount: orderTotal * 100,
          },
        },
      ],
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Call backend API to save reservation
    const response = await axios.post(
      "http://localhost:8080/auth/reservations",
      bookingDetails,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { bookingId } = response.data; // Assuming the backend returns a bookingId
    console.log("Reservation API Response:", response.data);

    // Send confirmation email with Booking ID
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail, // Customer email address
      subject: `Booking Confirmation: ${hotel.name}`,
      text: `Thank you for booking with us!\n\nHere are your booking details:\n\nBooking ID: ${bookingId}\nHotel: ${hotel.name}\nRoom: ${room.name}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nTotal Price: $${orderTotal.toFixed(
        2
      )}\n\nWe look forward to hosting you!`,
      html: `
        <h2>Thank you for booking with us!</h2>
        <p>Here are your booking details:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${bookingId}</li>
          <li><strong>Hotel:</strong> ${hotel.name}</li>
          <li><strong>Room:</strong> ${room.name}</li>
          <li><strong>Check-in:</strong> ${checkIn}</li>
          <li><strong>Check-out:</strong> ${checkOut}</li>
          <li><strong>Total Price:</strong> $${orderTotal.toFixed(2)}</li>
        </ul>
        <p>We look forward to hosting you!</p>
      `,
    });

    console.log("Confirmation email sent successfully!");

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Error processing payment or sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
};
