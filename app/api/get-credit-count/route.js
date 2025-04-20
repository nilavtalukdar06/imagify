import userModel from "@/utils/models/user.model";
import { NextResponse } from "next/server";

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
        message: "error fetching user info",
      },
      { status: 500 }
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
