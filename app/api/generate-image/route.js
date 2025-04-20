import { NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";

export async function GET() {
  async function main() {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const contents = "create an image of a cute puppy";
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp-image-generation",
        contents: contents,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });
      if (!response.candidates || !response.candidates[0]?.content?.parts) {
        throw new Error("Invalid AI response structure");
      }

      // Extract only relevant data
      const resultParts = response.candidates[0].content.parts.map((part) => ({
        text: part.text || null,
        image: part.inlineData?.data || null,
      }));

      return resultParts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const result = await main();
  return NextResponse.json({ result }, { status: 200 });
}
