import { NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";
import userModel from "@/utils/models/user.model";
import connection from "@/utils/db/mongodb";

export async function POST(request) {
  const text = await request.json();
  if (!text || !text.prompt || !text.email) {
    return NextResponse.json(
      { message: "prompt is required" },
      { status: 400 }
    );
  }
  const user = await userModel.findOne({ email: text.email });
  if (!user) {
    return NextResponse.json(
      {
        message: "unauthorized",
      },
      { status: 401 }
    );
  }

  if (user.token === 0) {
    return NextResponse.json(
      {
        message: "credit expired",
      },
      {
        status: 401,
      }
    );
  }
  async function main() {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const contents = text.prompt.trim();
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp-image-generation",
        contents: contents,
        config: {
          aspectRatio: "1:1",
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });
      console.log(response);
      if (!response.candidates || !response.candidates[0]?.content?.parts) {
        throw new Error("Invalid AI response structure");
      }

      // Extract only relevant data
      const resultParts = response.candidates[0].content.parts.map((part) => ({
        text: part.text || null,
        image: part.inlineData?.data || null,
      }));
      user.token -= 1;
      await userModel.findOneAndUpdate(
        { email: text.email },
        { $set: { token: user.token } }
      );

      return resultParts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const result = await main();
  return NextResponse.json({ result, token: user.token }, { status: 201 });
}
