import userModel from "@/utils/models/user.model";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  const data = await request.json();
  if (!data) {
    return NextResponse.json(
      {
        message: "user data is not present",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const order = await razorpay.orders.create({
      amount: 20 * 100,
      currency: "INR",
      receipt: "reciept_" + Math.random().toString(36).substring(7),
    });
    let user = null;
    if (order) {
      user = await userModel.findOneAndUpdate(
        { email: data.email },
        { $set: { token: 50 } }
      );
    }
    if (!user) {
      throw new Error("Failed to fetch user");
    }
    return NextResponse.json(
      {
        message: "user is upgraded to premium user",
        orderId: order.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Internal Server Error, error: ${error}`,
      },
      { status: 500 }
    );
  }
}
