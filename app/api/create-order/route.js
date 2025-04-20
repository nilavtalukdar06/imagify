import userModel from "@/utils/models/user.model";
import { NextResponse } from "next/server";

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
    const user = await userModel.findOneAndUpdate(
      { email: data.email },
      { $set: { token: 50 } }
    );
    console.log(user);
    if (!user) {
      throw new Error("Failed to fetch user");
    }
    return NextResponse.json(
      {
        message: "user is upgraded to premium user",
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
