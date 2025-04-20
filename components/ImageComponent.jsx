"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageComponent() {
  const [imageSrc, setImageSrc] = useState(
    "https://assets.hardwarezone.com/img/2017/10/hennessy-venom.jpg"
  );
  const fetchData = async () => {
    const response = await fetch("/api/generate-image", { method: "GET" });
    const data = await response.json();
    const image = data?.result[0]?.image;
    const srcImage = `data:image/png;base64,${image}`;
    setImageSrc(srcImage);
  };

  return (
    <section>
      <h1 className="text-center my-4 text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Generated Image
      </h1>

      <Image
        src={imageSrc}
        alt="Image"
        height={300}
        width={300}
        className="rounded-lg"
      />
    </section>
  );
}
