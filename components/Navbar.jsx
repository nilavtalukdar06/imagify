"use client";

import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Navbar({ token, isLoading }) {
  const reload = () => {
    window.location.reload();
  };
  const { user } = useUser();
  const createUser = async () => {
    if (!user?.primaryEmailAddress?.emailAddress || !user?.fullName) {
      toast.error("User information incomplete");
      return;
    }
    try {
      const response = await fetch("/api/create-user", {
        method: "POST",
        body: JSON.stringify({
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error creating user");
      }
      const data = await response.json();
      if (data.message === "user created successfully") {
        toast.success("User created successfully");
      } else if (data.message === "user is already present") {
        toast("User already exists", { icon: "ℹ️" });
      } else {
        toast("Unknown response from server", { icon: "❓" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating user");
    }
  };

  useEffect(() => {
    user && createUser();
  }, [user]);

  return (
    <header className="fixed h-[60px] inset-y-0 w-full flex justify-between items-center z-50 px-6">
      <button
        className="w-fit flex justify-center items-center cursor-pointer"
        onClick={reload}
      >
        <Image src="/logo.svg" height={50} width={100} alt="logo" />
      </button>
      <div className="flex items-center justify-center gap-x-6">
        <span className="px-3 py-2 rounded-full bg-[#D7EBFF] text-sm flex gap-x-2">
          <Image src="/vector.svg" alt="vector" height={15} width={15} />
          {isLoading
            ? "Loading..."
            : token !== null
            ? `Credits left ${token}`
            : "Credits not found ☠️"}
        </span>
        {user ? (
          <UserButton />
        ) : (
          <button className="cursor-pointer">
            <div className="w-10 h-10 rounded-full border bg-red-50 grid place-items-center">
              NT
            </div>
          </button>
        )}
      </div>
    </header>
  );
}
