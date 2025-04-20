import userModel from "@/utils/models/user.model";
import { NextResponse } from "next/server";
import connection from "@/utils/db/mongodb";

export async function POST(request) {
  const data = await request.json();
  if (!data || !data.email) {
    return NextResponse.json(
      {
        message: "user info is not there",
      },
      {
        status: 400,
      }
    );
  }
  const user = await userModel.findOne({ email: data.email });
  if (!user) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      credit: user.token,
    },
    {
      status: 201,
    }
  );
}
