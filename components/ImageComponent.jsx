"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageComponent() {
  const [imageSrc, setImageSrc] = useState("");
  const fetchData = async () => {
    const response = await fetch("/api/generate-image", { method: "GET" });
    const data = await response.json();
    const image = data?.result[0]?.image;
    const imagesrc = `data:image/png;base64,${image}`;
    setImageSrc(imagesrc);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <h1 className="text-center">Image</h1>
      <Image src={imageSrc} alt="Image" height={300} width={300} />
    </section>
  );
}
