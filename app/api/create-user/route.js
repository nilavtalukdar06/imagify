import { NextResponse } from "next/server";
import connection from "@/utils/db/mongodb";
import userModel from "@/utils/models/user.model";

export async function POST(request) {
  const { name, email } = await request.json();
  if (!email || !name) {
    return NextResponse.json(
      { message: "Name and email are required" },
      { status: 400 }
    );
  }
  try {
    const result = await userModel.findOne({ email: email });
    if (!result) {
      await userModel.create({
        name,
        email,
      });
      return NextResponse.json(
        {
          message: "user created successfully",
        },
        {
          status: 201,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "user is already present",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error(`error creating user, error: ${error}`);
    return NextResponse.json(
      {
        message: `Failed to create user, error: ${error}`,
      },
      {
        status: 500,
      }
    );
  }
}
