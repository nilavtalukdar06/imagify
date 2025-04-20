import { NextResponse } from "next/server";
import connection from "@/utils/db/mongodb";
import userModel from "@/utils/models/user.model";

export async function POST(request) {
  const { name, email } = await request.json();
  try {
    await userModel.insertOne({
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
