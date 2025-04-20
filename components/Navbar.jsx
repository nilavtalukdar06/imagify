"use client";

import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const reload = () => {
    window.location.reload();
  };
  const user = useUser();
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
          Credits left: 3
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
