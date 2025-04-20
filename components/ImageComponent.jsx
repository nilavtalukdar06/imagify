"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import Image from "next/image";
import Loader from "./Loader";
import { Button } from "@/components/ui/button";

export default function ImageComponent() {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setDisabled(true);
      setError(false); // Reset error state
      setImageSrc(""); // Optionally reset image
      const response = await fetch("/api/generate-image", { method: "GET" });
      const data = await response.json();
      const image = data?.result[0]?.image;
      const srcImage = `data:image/png;base64,${image}`;
      setImageSrc(srcImage);
    } catch (error) {
      setError(true);
      setImageSrc(""); // Optionally clear image on error
      console.error(`Failed to generate image, error: ${error}`);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "downloaded-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section>
      <h1 className="text-center my-4 text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        {imageSrc === "" ? "AI Image Generator" : "Generated Image"}
      </h1>
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
          Couldn't generate image 🥲
        </div>
      ) : (
        imageSrc && (
          <Image
            src={imageSrc}
            alt="Image"
            height={300}
            width={300}
            className="rounded-lg"
          />
        )
      )}
      <div className="w-full flex justify-center items-center gap-x-4">
        {imageSrc && (
          <Button
            className="flex gap-x-2 justify-center items-center cursor-pointer"
            onClick={handleDownload}
          >
            Download
            <Download />
          </Button>
        )}
        <Button
          variant="outline"
          className="cursor-pointer my-4"
          onClick={fetchData}
          disabled={disabled}
        >
          {disabled ? "Generating..." : "Generate Image 💫"}
        </Button>
      </div>
    </section>
  );
}
