"use client";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import Image from "next/image";
import Navbar from "./Navbar";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { useUser } from "@clerk/nextjs";
import { AlertButton } from "./AlertButton";

export default function ImageComponent() {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [creditLoading, setCreditLoading] = useState(false);
  const [credit, setCredit] = useState(0);
  const [value, setValue] = useState("");
  const { user, isLoaded } = useUser();
  const fetchData = async () => {
    try {
      if (!value) {
        alert("Enter a prompt to continue");
        return;
      }
      setLoading(true);
      setDisabled(true);
      setError(false);
      setImageSrc("");
      const response = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({
          prompt: value,
          email: user?.primaryEmailAddress?.emailAddress,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      const image = data?.result[0]?.image;
      const srcImage = `data:image/png;base64,${image}`;
      setImageSrc(srcImage);
      setCredit(data.token);
      toast.success("Image Generated");
    } catch (error) {
      setError(true);
      setImageSrc("");
      toast.error("Failed to generate image");
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
    window.location.reload();
  };

  const fetchCredits = async () => {
    try {
      setCreditLoading(true);
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) {
        setCredit(null);
        setCreditLoading(false);
        return;
      }
      const response = await fetch("/api/get-credit-count", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching credit counts");
      }
      const data = await response.json();
      setCredit(data.credit);
    } catch (error) {
      console.error(error);
      setCredit(null);
      // Refresh the page if fetching credits fails
      window.location.reload();
    } finally {
      setCreditLoading(false);
    }
  };

  const reload = () => {
    window.location.reload();
  };

  useEffect(() => {
    user && isLoaded === true && fetchCredits();
  }, [user]);

  return (
    <section className="relative p-4 min-h-screen max-w-screen overflow-x-hidden flex flex-col justify-center items-center bg-gradient-to-b from-yellow-50 to-transparent">
      <Navbar token={credit} isLoading={creditLoading} />
      {!error && credit === 0 && (
        <h1 className="text-center my-4 text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Buy some credits for more images
        </h1>
      )}
      {!error && credit !== 0 && (
        <h1 className="text-center my-4 text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          {imageSrc === "" ? "AI Image Generator" : "Generated Image"}
        </h1>
      )}

      {!error && !imageSrc && credit !== 0 && (
        <Textarea
          className="my-4 sm:my-8 bg-white max-w-xl"
          placeholder="Write your idea to generate image"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
        />
      )}

      {loading ? (
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
          Couldn't generate image!
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
      {credit !== 0 && (
        <div className="w-full flex justify-center items-center gap-x-4">
          {imageSrc && (
            <Button
              className="flex gap-x-2 justify-center items-center cursor-pointer my-4"
              onClick={handleDownload}
            >
              Download
              <Download />
            </Button>
          )}
          {!imageSrc && !error && (
            <Button
              variant="outline"
              className="cursor-pointer my-4"
              onClick={fetchData}
              disabled={disabled}
            >
              {disabled ? "Generating..." : "Generate Image 💫"}
            </Button>
          )}
          {error && (
            <Button
              className="my-4 cursor-pointer"
              variant="destructive"
              onClick={reload}
            >
              Try Again 🥲
            </Button>
          )}
        </div>
      )}
      {credit === 0 && (
        <div className="my-4">
          <AlertButton />
        </div>
      )}
    </section>
  );
}
